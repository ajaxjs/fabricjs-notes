import { Point } from "fabric";

/**
 * 计算两个角度之间的有符号差值，确保结果在(0, 2π]范围内
 * @param {number} theta1 - 起始角度（弧度）
 * @param {number} theta2 - 结束角度（弧度）
 * @returns {number} 两个角度之间的有符号差值（弧度）
 */
export function AngularDiffSigned(theta1: number, theta2: number) {
  let dif = theta2 - theta1;
  // 调整差值使其落在(0, 2π]范围内
  while (dif >= 2 * Math.PI)
      dif -= 2 * Math.PI;
  while (dif <= 0)
      dif += 2 * Math.PI;
  return dif;
}

/**
 * 检查三个角度是否按顺时针顺序排列
 * @param {number} x - 第一个角度（弧度）
 * @param {number} y - 第二个角度（弧度）
 * @param {number} z - 第三个角度（弧度）
 * @returns {boolean} 如果三个角度按顺时针顺序排列则返回true
 */
export function AnglesInClockwiseSequence(x: number, y: number, z: number) {
  // 检查从x到y再到z的总角度差是否小于2π
  return AngularDiffSigned(x, y) + AngularDiffSigned(y, z) < 2*Math.PI;
}

/**
 * 计算扇形区域的边界框
 * @param {Point} E - 扇形起始点
 * @param {Point} F - 扇形结束点
 * @param {Point} C - 圆心点
 * @param {number} radius - 圆的半径
 * @returns {Object} 包含x、y、width和height的边界框对象
 */
export function sectorBoundingBox(E: Point, F: Point, C: Point, radius: number) {
  // 初始化边界框为E点的坐标
  let x1 = E.x;
  let y1 = E.y;
  let x2 = x1, y2 = y1;
  
  // 将F点坐标纳入边界框计算
  if (F.x < x1) x1 = F.x;
  if (F.x > x2) x2 = F.x;
  if (F.y < y1) y1 = F.y;
  if (F.y > y2) y2 = F.y;

  // 计算E和F相对于圆心C的角度
  const thetaE = Math.atan2(E.y - C.y, E.x - C.x);
  const thetaF = Math.atan2(F.y - C.y, F.x - C.x);
  
  // 检查扇形是否包含右侧极限点（0弧度方向）
  if (AnglesInClockwiseSequence(thetaE, 0/*right*/, thetaF)) {
      const x = (C.x + radius);
      if (x > x2) x2 = x;
  }
  
  // 检查扇形是否包含下侧极限点（π/2弧度方向）
  if (AnglesInClockwiseSequence(thetaE, Math.PI/2/*bottom*/, thetaF)) {
      const y = (C.y + radius);
      if (y > y2) y2 = y;
  }
  
  // 检查扇形是否包含左侧极限点（π弧度方向）
  if (AnglesInClockwiseSequence(thetaE, Math.PI/*left*/, thetaF)) {
      const x = (C.x - radius);
      if (x < x1) x1 = x;
  }
  
  // 检查扇形是否包含上侧极限点（3π/2弧度方向）
  if (AnglesInClockwiseSequence(thetaE, Math.PI*3/2/*top*/, thetaF)) {
      const y = (C.y - radius);
      if (y < y1) y1 = y;
  }
  
  // 返回计算得到的边界框
  return {x: x1, y: y1, width: x2 - x1, height: y2 - y1};
}