#pragma once

namespace RayCad
{
	/// <summary>
	/// Vector 클래스
	/// </summary>
	struct Vector3  {
	public:

		/// <summary>
		/// 벡터 x 값
		/// </summary>
		cad_type _x;
		
		/// <summary>
		/// 벡터 y 값
		/// </summary>
		cad_type _y;
		
		/// <summary>
		/// 벡터 z 값
		/// </summary>
		cad_type _z;

		/// <summary>
		/// 3차원 상의 좌표를 나타낸다
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		Vector3(cad_type x, cad_type y, cad_type z) : _x(x), _y(y),_z(z) {}
		
		/// <summary>
		/// 모든 값이 0인 3차원 상의 좌표를 나타낸다
		/// </summary>
		Vector3() : _x(0), _y(0), _z(0) {}

		/// <summary>
		/// 3차원 상의 좌표를 생성한다
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		/// <return>생성된 좌표</return>
		static Vector3 Create(cad_type x, cad_type y, cad_type z) {
			Vector3 v;
			v._x = x;
			v._y = y;
			v._z = z;
			return v;
		}

		/// <summary>
		/// 좌표를 설정한다
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void Set(cad_type x, cad_type y, cad_type z) {
			_x = x;
			_y = y;
			_z = z;

		}

		/// <summary>
		/// src로부터 좌표를 설정한다
		/// </summary>
		/// <param name="src">원본 데이터</param>
		void Set(Vector3 src) {
			_x = src._x;
			_y = src._y;
			_z = src._z;
		}

		/// <summary>
		/// 모든 축의 좌표 값을 주어진 좌표만큼 각각 더해준다.
		/// </summary>
		/// <param name="other">현재 좌표에 더할 좌표값</param>
		/// <returns>결과 좌표</returns>
		Vector3 operator+(Vector3& other) {
			return Vector3(_x + other._x, _y + other._y, _z + other._z);
		}

		/// <summary>
		/// 모든 축의 좌표 값을 주어진 좌표만큼 각각 빼준다.
		/// </summary>
		/// <param name="other">현재 좌표에 뺄 좌표값</param>
		/// <returns></returns>
		Vector3 operator-(Vector3& other) {
			return Vector3(_x - other._x, _y - other._y, _z - other._z);
		}

		/// <summary>
		/// Vector4d 객체로부터 좌표값을 설정한다
		/// </summary>
		/// <param name="src">참고할 Vector4d 객체</param>
		void Set(Vector4d src) {
			_x = src[0] / src[3];
			_y = src[1] / src[3];
			_z = src[2] / src[3];
		}

		/// <summary>
		/// 원점으로부터의 거리를 구한다
		/// </summary>
		/// <returns>원점으로부터의 거리</returns>
		double Length() {
			return sqrt(_x * _x + _y * _y + _z * _z);
		}

		/// <summary>
		/// normalize를 진행한다
		/// </summary>
		void Normalize() {
			double l = Length();
			if (l > 0.000001)
			{
				_x /= l;
				_y /= l;
				_z /= l;
			}
		}

		/// <summary>
		/// 스칼라곱을 수행한다
		/// </summary>
		/// <param name="s">스칼라 크기</param>
		void MultiplyScalar(double s) {
			_x *= s;
			_y *= s;
			_z *= s;
		}

		/// <summary>
		/// 근접 여부 측정
		/// </summary>
		/// <param name="v">비교할 Vector3</param>
		/// <returns>근접 여부</returns>
		bool IsTooNear(Vector3 v) {
			Vector3 df(v._x - this->_x, v._y - this->_y, v._z - this->_z);
			if (df.Length() < 0.001)
				return true;
			return false;
		}

		/// <summary>
		/// 대상 벡터와 dot product를 구한다.
		/// </summary>
		/// <param name="v">대상 벡터</param>
		/// <returns>결과 값</returns>
		double Dot(Vector3 v) {
			return this->_x * v._x + this->_y * v._y + this->_z * v._z;
		}

		/// <summary>
		/// 대상 벡터와 cross product를 구한다.
		/// </summary>
		/// <param name="v">대상 벡터</param>
		/// <returns>결과 벡터</returns>
		Vector3 Cross(Vector3 v) {
			double ni = this->_y * v._z - this->_z * v._y;
			double nj = this->_z * v._x - this->_x * v._z;
			double nk = this->_x * v._y - this->_y * v._x;
			return Vector3(ni, nj, nk);
		}

	};
}
