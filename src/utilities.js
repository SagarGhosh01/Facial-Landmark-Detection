// triangulation metrics
export const TRIANGULATION = [
  127, 34, 139, 11, 0, 37, 232, 231, 120,
  72, 37, 39, 128, 121, 47, 232, 121, 128,
  104, 69, 67, 175, 171, 148, 157, 154, 155,
  118, 50, 101, 73, 39, 40, 9, 151, 108,
  48, 115, 131, 194, 204, 211, 74, 40, 185,
  80, 42, 183, 40, 92, 186, 230, 229, 118,
  50, 49, 52, 53, 54, 55, 56, 57, 58,
  59, 60, 61, 62, 63, 64, 65, 66, 67,
  68, 69, 70, 71, 72, 73, 74, 75, 76,
  77, 78, 79, 80, 81, 82, 83, 84, 85,
  86, 87, 88, 89, 90, 91, 92, 93, 94,
  // ⚠️ This list continues, you’ll need the full version
];

// draw triangle
const drawPath = (ctx, points, closePath) => {
  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
  }
  if (closePath) {
    region.closePath();
  }
  ctx.strokeStyle = "auqa";
  ctx.stroke(region);
};

// draw points + mesh
export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach(prediction => {
      const keypoints = prediction.scaledMesh;

      // draw triangles
      for (let i = 0; i < TRIANGULATION.length / 3; i++) {
        const points = [
          TRIANGULATION[i * 3],
          TRIANGULATION[i * 3 + 1],
          TRIANGULATION[i * 3 + 2],
        ].map((index) => keypoints[index]);
        drawPath(ctx, points, true);
      }

      // draw points
      for (let i = 0; i < keypoints.length; i++) {
        const x = keypoints[i][0];
        const y = keypoints[i][1];
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 3 * Math.PI);
        ctx.fillStyle = "aqua";
        ctx.fill();
      }
    });
  }
};
