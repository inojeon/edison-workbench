/**
 * Cubic Spline 곡선 생성 도구 클래스
 */
export class Spline {

  /**
   * 클래스 생성자
   * @param {Array} xs 샘플 점 x 좌표 리스트
   * @param {Array} ys 샘플 점 y 좌표 리스트
   */
  constructor(xs, ys) {
    this.xs = xs;
    this.ys = ys;
    this.ks = this.getNaturalKs(new Float64Array(this.xs.length));
  }

  /**
   * Natural Knot Array를 계산한다,
   * @param {Array} ks Source Knot's
   * @return {Array} Natural Knot's
   */
  getNaturalKs(ks) {
    const n = this.xs.length - 1;
    const A = zerosMat(n + 1, n + 2);

    for (
      let i = 1;
      i < n;
      i++ // rows
    ) {
      A[i][i - 1] = 1 / (this.xs[i] - this.xs[i - 1]);
      A[i][i] =
        2 *
        (1 / (this.xs[i] - this.xs[i - 1]) + 1 / (this.xs[i + 1] - this.xs[i]));
      A[i][i + 1] = 1 / (this.xs[i + 1] - this.xs[i]);
      A[i][n + 1] =
        3 *
        ((this.ys[i] - this.ys[i - 1]) /
          ((this.xs[i] - this.xs[i - 1]) * (this.xs[i] - this.xs[i - 1])) +
          (this.ys[i + 1] - this.ys[i]) /
            ((this.xs[i + 1] - this.xs[i]) * (this.xs[i + 1] - this.xs[i])));
    }

    A[0][0] = 2 / (this.xs[1] - this.xs[0]);
    A[0][1] = 1 / (this.xs[1] - this.xs[0]);
    A[0][n + 1] =
      (3 * (this.ys[1] - this.ys[0])) /
      ((this.xs[1] - this.xs[0]) * (this.xs[1] - this.xs[0]));

    A[n][n - 1] = 1 / (this.xs[n] - this.xs[n - 1]);
    A[n][n] = 2 / (this.xs[n] - this.xs[n - 1]);
    A[n][n + 1] =
      (3 * (this.ys[n] - this.ys[n - 1])) /
      ((this.xs[n] - this.xs[n - 1]) * (this.xs[n] - this.xs[n - 1]));

    return solve(A, ks);
  }

  /**
   * inspired by https://stackoverflow.com/a/40850313/4417327
   */
  /**
   * 인덱스를 구한다.
   * @param {*} target 계산 값
   * @return {*} 인덱스
   */
  getIndexBefore(target) {
    let low = 0;
    let high = this.xs.length;
    let mid = 0;
    while (low < high) {
      mid = Math.floor((low + high) / 2);
      if (this.xs[mid] < target && mid !== low) {
        low = mid;
      } else if (this.xs[mid] >= target && mid !== high) {
        high = mid;
      } else {
        high = low;
      }
    }
    return low + 1;
  }
  /**
   * x 위치에서의 계산값을 구한다.
   *
   * @param {*} x x값
   * @return {*} 계산값
   */
  at(x) {
    let i = this.getIndexBefore(x);
    const t = (x - this.xs[i - 1]) / (this.xs[i] - this.xs[i - 1]);
    const a =
      this.ks[i - 1] * (this.xs[i] - this.xs[i - 1]) -
      (this.ys[i] - this.ys[i - 1]);
    const b =
      -this.ks[i] * (this.xs[i] - this.xs[i - 1]) +
      (this.ys[i] - this.ys[i - 1]);
    const q =
      (1 - t) * this.ys[i - 1] +
      t * this.ys[i] +
      t * (1 - t) * (a * (1 - t) + b * t);
    return q;
  }
};

/**
 * Knot's 값에 대한 방정식을 계산한다.
 * @param {*} A Linear Matrix
 * @param {*} ks Knot's
 * @return {*} 계산 결과 Knot's
 */
function solve(A, ks) {
  const m = A.length;
  let h = 0;
  let k = 0;
  while (h < m && k <= m) {
    let i_max = 0;
    let max = -Infinity;
    for (let i = h; i < m; i++) {
      const v = Math.abs(A[i][k]);
      if (v > max) {
        i_max = i;
        max = v;
      }
    }

    if (A[i_max][k] === 0) {
      k++;
    } else {
      swapRows(A, h, i_max);
      for (let i = h + 1; i < m; i++) {
        const f = A[i][k] / A[h][k];
        A[i][k] = 0;
        for (let j = k + 1; j <= m; j++) A[i][j] -= A[h][j] * f;
      }
      h++;
      k++;
    }
  }

  for (
    let i = m - 1;
    i >= 0;
    i-- // rows = columns
  ) {
    var v = 0;
    if (A[i][i]) {
      v = A[i][m] / A[i][i];
    }
    ks[i] = v;
    for (
      let j = i - 1;
      j >= 0;
      j-- // rows
    ) {
      A[j][m] -= A[j][i] * v;
      A[j][i] = 0;
    }
  }
  return ks;
}

/**
 * 제로 Matrix Array를 생성한다.
 * @param {Number} r 행 수
 * @param {Number} c 열 수
 * @return {Array} Martix Array
 */
function zerosMat(r, c) {
  const A = [];
  for (let i = 0; i < r; i++) A.push(new Float64Array(c));
  return A;
}

/**
 * 매트릭스의 행을 교환한다.
 * @param {Matrix4} m 매트릭스
 * @param {Number} k 교환할 행 번호
 * @param {Number} l 교환할 행 번호
 */
function swapRows(m, k, l) {
  let p = m[k];
  m[k] = m[l];
  m[l] = p;
}
