#pragma once

namespace RayCad
{
	/// <summary>
	/// 4x4 Matrix API 클래스
	/// </summary>
	class Matrix4
	{
	public:

		/// <summary>
		/// matrix 필드
		/// </summary>
		Eigen::Matrix4d _mat;

		/// <summary>
		/// Identity 행렬로 초기화한다
		/// </summary>
		Matrix4();

		/// <summary>
		/// Identity 행렬로 설정한다
		/// </summary>
		void SetIdentity();

		/// <summary>
		/// 주어진 좌표에 대해 회전을 설정한다
		/// </summary>
		/// <param name="x">회전 중심 x 좌표</param>
		/// <param name="y">회전 중심 y 좌표</param>
		/// <param name="z">회전 중심 z 좌표</param>
		/// <param name="angle">회전각</param>
		/// <param name="ax">회전축 x 좌표</param>
		/// <param name="ay">회전축 y 좌표</param>
		/// <param name="az">회전축 z 좌표</param>
		void SetRotateAngleAxis(double x, double y, double z, double angle, double ax, double ay, double az);

		/// <summary>
		/// 주어진 선분에 대해 mirror를 설정한다
		/// </summary>
		/// <param name="p1x">선분의 시작 x 좌표</param>
		/// <param name="p1y">선분의 시작 y 좌표</param>
		/// <param name="p2x">선분의 끝 x 좌표</param>
		/// <param name="p2y">선분의 끝 y 좌표</param>
		void SetMirrorLine2D(double p1x, double p1y, double p2x, double p2y);

		/// <summary>
		/// 주어진 평면에 대해 mirror를 설정한다 (평면 기준점과 노말)
		/// </summary>
		/// <param name="p1x">선분의 시작 x 좌표</param>
		/// <param name="p1y">선분의 시작 y 좌표</param>
		/// <param name="p2x">선분의 끝 x 좌표</param>
		/// <param name="p2y">선분의 끝 y 좌표</param>
		void SetMirrorPlane3D(double p1x, double p1y, double p1z, double nx, double ny, double nz);

		/// <summary>
		/// 주어진 평면에 대해 mirror를 설정한다 (평면상의 3점)
		/// </summary>
		/// <param name="p1x">선분의 시작 x 좌표</param>
		/// <param name="p1y">선분의 시작 y 좌표</param>
		/// <param name="p2x">선분의 끝 x 좌표</param>
		/// <param name="p2y">선분의 끝 y 좌표</param>
		void SetMirrorPlane3P(double p1x, double p1y, double p1z, double p2x, double p2y, double p2z, double p3x, double p3y, double p3z);

		/// <summary>
		/// 주어진 좌표에 대해 평행이동을 설정한다
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void SetTranslate(double x, double y, double z);
		
		/// <summary>
		/// 주어진 좌표에 대해 스케일을 설정한다
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void SetScale(double x, double y, double z);
		
		/// <summary>
		/// 매트릭스 곱을 수행한다
		/// </summary>
		/// <param name="mat">곱할 매트릭스</param>
		void Multiply(shared_ptr<Matrix4> mat);

		/// <summary>
		/// 축으로부터 매트릭스를 설정한다
		/// </summary>
		/// <param name="x1">x 축의 x 좌표</param>
		/// <param name="y1">x 축의 y 좌표</param>
		/// <param name="z1">x 축의 z 좌표</param>
		/// <param name="x2">y 축의 x 좌표</param>
		/// <param name="y2">y 축의 y 좌표</param>
		/// <param name="z2">y 축의 z 좌표</param>
		/// <param name="x3">z 축의 x 좌표</param>
		/// <param name="y3">z 축의 y 좌표</param>
		/// <param name="z3">z 축의 z 좌표</param>
		/// <param name="ox">axes의 원점 x</param>
		/// <param name="oy">axes의 원점 y</param>
		/// <param name="oz">axes의 원점 z</param>
		void SetFromAxes(double x1, double y1, double z1, double x2, double y2, double z2, double x3, double y3, double z3, double ox, double oy, double oz);

		/// <summary>
		/// 2개의 점으로부터 회전 매트릭스를 설정한다
		/// </summary>
		/// <param name="x1">from x</param>
		/// <param name="y1">from y</param>
		/// <param name="z1">from z</param>
		/// <param name="x2">to x</param>
		/// <param name="y2">to y</param>
		/// <param name="z2">to z</param>
		void SetRotateVectorFromTo(double x1, double y1, double z1, double x2, double y2, double z2);
		
		/// <summary>
		/// 주어진 매트릭스로부터 매트릭스를 복제한다
		/// </summary>
		/// <param name="m">원본 매트릭스</param>
		void Clone(Matrix4 m);

		/// <summary>
		/// 역행렬 계산을 한다
		/// </summary>
		void Inverse();

	};


}