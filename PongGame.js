import { useEffect, useRef, useState } from "react";

export default function PongGame() {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(true);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const paddleWidth = 10, paddleHeight = 80;
    let paddle1Y = (canvas.height - paddleHeight) / 2;
    let paddle2Y = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2, ballY = canvas.height / 2;
    let ballSpeedX = 4, ballSpeedY = 4;
    const paddleSpeed = 6;
    let player1Up = false, player1Down = false, player2Up = false, player2Down = false;

    function resetBall() {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = ballSpeedX > 0 ? 4 : -4; // Reset ball speed direction
      ballSpeedY = 4;
    }

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "white";
      ctx.fillRect(10, paddle1Y, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - 20, paddle2Y, paddleWidth, paddleHeight);
      ctx.beginPath();
      ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.font = "30px Arial";
      ctx.fillText(`Player 1: ${score.player1}`, 20, 30);
      ctx.fillText(`Player 2: ${score.player2}`, canvas.width - 150, 30);
    }

    function update() {
      if (!gameRunning) return;
      if (player1Up && paddle1Y > 0) paddle1Y -= paddleSpeed;
      if (player1Down && paddle1Y < canvas.height - paddleHeight) paddle1Y += paddleSpeed;
      if (player2Up && paddle2Y > 0) paddle2Y -= paddleSpeed;
      if (player2Down && paddle2Y < canvas.height - paddleHeight) paddle2Y += paddleSpeed;

      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;
      
      if (
        (ballX <= 20 && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
        (ballX >= canvas.width - 20 && ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
      ) {
        ballSpeedX *= -1;
      }

      // Check if a player scores
      if (ballX <= 0) {
        setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
        resetBall();
      } else if (ballX >= canvas.width) {
        setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
        resetBall();
      }

      // End the game if a player reaches 10 points
      if (score.player1 === 10 || score.player2 === 10) {
        setGameRunning(false);
        alert(`Game Over! ${score.player1 === 10 ? 'Player 1' : 'Player 2'} wins!`);
      }
    }

    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }
    
    function keyDownHandler(e) {
      if (e.key === "w") player1Up = true;
      if (e.key === "s") player1Down = true;
      if (e.key === "ArrowUp") player2Up = true;
      if (e.key === "ArrowDown") player2Down = true;
    }

    function keyUpHandler(e) {
      if (e.key === "w") player1Up = false;
      if (e.key === "s") player1Down = false;
      if (e.key === "ArrowUp") player2Up = false;
      if (e.key === "ArrowDown") player2Down = false;
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    gameLoop();

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      setGameRunning(false);
    };
  }, [gameRunning, score]);

  return <canvas ref={canvasRef} width={800} height={400} className="border border-white" />;
}
