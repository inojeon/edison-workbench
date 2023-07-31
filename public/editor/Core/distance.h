#pragma once


namespace RayWycobi
{
	/// <summary>
	/// 선분과 점 사이의 거리를 구한다
	/// </summary>
	/// <param name="line_sx">선분의 시작 x 좌표</param>
	/// <param name="line_sy">선분의 시작 y 좌표</param>
	/// <param name="line_ex">선분의 끝 x 좌표</param>
	/// <param name="line_ey">선분의 끝 y 좌표</param>
	/// <param name="point_x">점의 x 좌표</param>
	/// <param name="point_y">점의 y 좌표</param>
	/// <returns>선분과 점 사이의 거리</returns>
	double DistLinesegPoint2(double line_sx, double line_sy, double line_ex, double line_ey, double point_x, double point_y);
	
	/// <summary>
	/// 3차원 선분과 점 사이의 거리를 구한다
	/// </summary>
	/// <param name="line_sx">선분의 시작 x 좌표</param>
	/// <param name="line_sy">선분의 시작 y 좌표</param>
	/// <param name="line_sz">선분의 시작 z 좌표</param>
	/// <param name="line_ex">선분의 끝 x 좌표</param>
	/// <param name="line_ey">선분의 끝 y 좌표</param>
	/// <param name="line_ez">선분의 끝 z 좌표</param>
	/// <param name="point_x">점 x 좌표</param>
	/// <param name="point_y">점 y 좌표</param>
	/// <param name="point_z">점 z 좌표</param>
	/// <returns>선분과 점 사이의 거리</returns>
	double DistLinesegPoint3(double line_sx, double line_sy, double line_sz, double line_ex, double line_ey, double line_ez, double point_x, double point_y, double point_z);

	/// <summary>
	/// 2차원 점과 점 사이의 거리
	/// </summary>
	/// <param name="point1_x">첫번째 점의 x 좌표</param>
	/// <param name="point1_y">첫번째 점의 y 좌표</param>
	/// <param name="point2_x">두번째 점의 x 좌표</param>
	/// <param name="point2_y">두번째 점의 y 좌표</param>
	/// <returns>점과 점 사이의 거리</returns>
	double DistPointPoint2(double point1_x, double point1_y, double point2_x, double point2_y);
	
	/// <summary>
	/// 3차원 점과 점 사이의 거리
	/// </summary>
	/// <param name="point1_x">첫번째 점의 x 좌표</param>
	/// <param name="point1_y">첫번째 점의 y 좌표</param>
	/// <param name="point1_z">첫번째 점의 z 좌표</param>
	/// <param name="point2_x">두번째 점의 x 좌표</param>
	/// <param name="point2_y">두번째 점의 y 좌표</param>
	/// <param name="point2_z">두번째 점의 z 좌표</param>
	/// <returns>점과 점 사이의 거리</returns>
	double DistPointPoint3(double point1_x, double point1_y, double point1_z, double point2_x, double point2_y, double point2_z);
	
	/// <summary>
	/// 원과 점 사이의 거리
	/// </summary>
	/// <param name="point1_x">점의 x 좌표</param>
	/// <param name="point1_y">점의 y 좌표</param>
	/// <param name="circle_x">원의 중심 x 좌표</param>
	/// <param name="circle_y">원의 중심 y 좌표</param>
	/// <param name="circle_r">원의 반지름</param>
	/// <returns></returns>
	double DistPointCircle2(double point1_x, double point1_y, double circle_x, double circle_y, double circle_r);
	
	/// <summary>
	/// 구체와 점 사이의 거리를 구한다
	/// </summary>
	/// <param name="point1_x">점의 x 좌표</param>
	/// <param name="point1_y">점의 y 좌표</param>
	/// <param name="point1_z">점의 z 좌표</param>
	/// <param name="sphere_x">구의 중심 x 좌표</param>
	/// <param name="sphere_y">구의 중심 y 좌표</param>
	/// <param name="sphere_z">구의 중심 z 좌표</param>
	/// <param name="sphere_r">구의 반지름</param>
	/// <returns>구체와 점 사이의 거리</returns>
	double DistPointSphere3(double point1_x, double point1_y, double point1_z, double sphere_x, double sphere_y, double sphere_z, double sphere_r);
	
	/// <summary>
	/// 점과 사각형 사이의 거리를 구한다
	/// 사각형의 좌표는 대각선 위치의 두 점을 사용해야 한다
	/// </summary>
	/// <param name="point_x">점의 x좌표</param>
	/// <param name="point_y">점의 y좌표</param>
	/// <param name="rect_x1">사각형의 x 좌표1</param>
	/// <param name="rect_y1">사각형의 y 좌표1</param>
	/// <param name="rect_x2">사각형의 x 좌표2</param>
	/// <param name="rect_y2">사각형의 y 좌표2</param>
	/// <returns>점과 사각형 사이의 거리</returns>
	double DistPointRectangle2(double point_x, double point_y, double rect_x1, double rect_y1, double rect_x2, double rect_y2);


	/// <summary>
	/// 2D Ray 와 Segment 간의 교차점을 구한다.
	/// </summary>
	/// <param name="origin">ray 원점</param>
	/// <param name="dir">ray 방향</param>
	/// <param name="p1">segment 점 1</param>
	/// <param name="p2">segment 점 2</param>
	/// <returns>ray 원점으로부터 교차점까지의 거리</returns>
	double GetRayToLineSegmentIntersection(RayCad::Vector3 origin, RayCad::Vector3 dir, RayCad::Vector3 p1, RayCad::Vector3 p2);


	/// <summary>
	/// 직선과 직선 사이의 거리를 구한다
	/// </summary>
	/// <param name="o1">첫번째 직선의 origin</param>
	/// <param name="v1">첫번째 직선의 vector</param>
	/// <param name="o2">두번째 직선의 origin</param>
	/// <param name="v2">두번째 직선의 vector</param>
	/// <returns>직선 사이의 거리</returns>
	double DistLineLine3(RayCad::Vector3 o1, RayCad::Vector3 v1, RayCad::Vector3 o2, RayCad::Vector3 v2);

	/// <summary>
	/// Ray와 Segement 사이의 거리를 구한다
	/// </summary>
	/// <param name="ro">ray origin</param>
	/// <param name="rd">ray direction</param>
	/// <param name="p1">segment의 첫번째 점</param>
	/// <param name="p2">segment의 두번째 점</param>
	/// <returns>Ray와 Segment 사이의 거리</returns>
	double DistRaySegment3(RayCad::Vector3 ro, RayCad::Vector3 rd, RayCad::Vector3 p1, RayCad::Vector3 p2);

}
