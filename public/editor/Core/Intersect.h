#pragma once

#include "../wykobi/wykobi.hpp"
#include "../wykobi/wykobi_utilities.hpp"
#include "../wykobi/wykobi_algorithm.hpp"

namespace RayCad
{
	class Point;
	class Group;
	class Geom;
	class PointList;

	/// <summary>
	/// wykobi에서 사용될 수 있는 형태로 관리하기 위한 구조체
	/// </summary>
	/// <param name="planex">평면 좌표 x</param>
	/// <param name="planey">평면 좌표 y</param>
	/// <param name="planez">평면 좌표 z</param>
	/// <param name="planenx">평면 normal x</param>
	/// <param name="planeny">평면 normal y</param>
	/// <param name="planenz">평면 normal z</param>
	/// <param name="rayx">광선 x 좌표</param>
	/// <param name="rayy">광선 y 좌표</param>
	/// <param name="rayz">광선 z 좌표</param>
	/// <param name="raynx">광선 normal x</param>
	/// <param name="rayny">광선 normal y</param>
	/// <param name="raynz">광선 normal z</param>
	/// <returns></returns>
	struct GeomEntity {
		shared_ptr<wykobi::circle<double>> circle;
		shared_ptr<wykobi::segment<double,2>> segment;
		shared_ptr<wykobi::polygon<double, 2>> polygon;
		shared_ptr<BoundingBox2> bbox2;
		int type;
	};

	/// <summary>
	/// 평면과 광선의 교차점 구하기
	/// </summary>
	/// <param name="planex">평면 상의 x 좌표</param>
	/// <param name="planey">평면 상의 y 좌표</param>
	/// <param name="planez">평면 상의 z 좌표</param>
	/// <param name="planenx">평면의 x축 방향</param>
	/// <param name="planeny">평면의 y축 방향</param>
	/// <param name="planenz">평면의 z축 방향</param>
	/// <param name="rayx">광선의 x 좌표</param>
	/// <param name="rayy">광선의 y 좌표</param>
	/// <param name="rayz">광선의 z 좌표</param>
	/// <param name="raynx">광선의 x축 방향</param>
	/// <param name="rayny">광선의 y축 방향</param>
	/// <param name="raynz">광선의 z축 방향</param>
	/// <returns>평면과 광선의 교차점</returns>
	shared_ptr<Point> IntersectRayPlane(cad_type planex, cad_type planey, cad_type planez,
		cad_type planenx, cad_type planeny, cad_type planenz,
		cad_type rayx, cad_type rayy, cad_type rayz,
		cad_type raynx, cad_type rayny, cad_type raynz
		);


	/// <summary>
	/// 그룹 내 원소들 사이의 교차점을 조사한다
	/// </summary>
	/// <param name="group">교차점을 조사할 그룹</param>
	/// <param name="plist">교차점이 저장될 공간</param>
	void GetIntersectionPointList(shared_ptr<Group> group, shared_ptr<PointList> plist, shared_ptr<Geom> refObj = NULL);
	

	/// <summary>
	/// Geom 객체를 변환하여 wykobi 라이브러리를 사용할 수 있는 형태의 GeomEntity 벡터에 추가한다
	/// </summary>
	/// <param name="geom">vector에 추가할 geom</param>
	/// <param name="geomEntityList">변환된 geom을 저장하는 공간</param>
	void GetGeomEntity(shared_ptr<Geom> geom, shared_ptr<vector<GeomEntity>> geomEntityList);

	
	/// <summary>
	/// 선분과 원 사이의 교차점 구하기
	/// </summary>
	/// <param name="line1x">선분 시작 x 좌표</param>
	/// <param name="line1y">선분 시작 y 좌표</param>
	/// <param name="line2x">선분 끝 x 좌표</param>
	/// <param name="line2y">선분 끝 y 좌표</param>
	/// <param name="circlex">원의 중심 x 좌표</param>
	/// <param name="circley">원의 중심 y 좌표</param>
	/// <param name="radius">원의 반지름</param>
	/// <param name="plist">교차점이 저장될 공간</param>
	/// <returns>교차 여부</returns>
	bool IntersectLinesegCircle(cad_type line1x, cad_type line1y,
		cad_type line2x, cad_type line2y,
		cad_type circlex, cad_type circley, cad_type radius,
		shared_ptr<PointList> plist);

	/// <summary>
	/// 직선과 원 사이의 교차점 구하기
	/// </summary>
	/// <param name="line1x">직선의 첫번째 x 좌표</param>
	/// <param name="line1y">직선의 첫번째 y 좌표</param>
	/// <param name="line2x">직선의 두번째 x 좌표</param>
	/// <param name="line2y">직선의 두번째 y 좌표</param>
	/// <param name="circlex">원의 중심 x 좌표</param>
	/// <param name="circley">원의 중심 y 좌표</param>
	/// <param name="radius">원의 반지름</param>
	/// <param name="plist">교차점이 저장될 공간</param>
	/// <returns></returns>
	bool IntersectLineCircle(cad_type line1x, cad_type line1y,
		cad_type line2x, cad_type line2y,
		cad_type circlex, cad_type circley, cad_type radius,
		shared_ptr<PointList> plist);

	/// <summary>
	/// 선분과 호 사이의 교차점 구하기
	/// </summary>
	/// <param name="line1x">선분 시작 x 좌표</param>
	/// <param name="line1y">선분 시작 y 좌표</param>
	/// <param name="line2x">선분 끝 x 좌표</param>
	/// <param name="line2y">선분 끝 y 좌표</param>
	/// <param name="circlex">호의 중심 x 좌표</param>
	/// <param name="circley">호의 중심 y 좌표</param>
	/// <param name="radius">호의 반지름</param>
	/// <param name="start">호의 시작 각도</param>
	/// <param name="end">호의 끝 각도</param>
	/// <param name="plist">교차점이 저장될 공간</param>
	/// <returns>교차 여부</returns>
	bool IntersectLinesegArc(cad_type line1x, cad_type line1y,
		cad_type line2x, cad_type line2y,
		cad_type circlex, cad_type circley, cad_type radius,
		cad_type start, cad_type end,
		shared_ptr<PointList> plist);

	/// <summary>
	/// 직선과 직선 사이의 교차점을 구한다
	/// </summary>
	/// <param name="l1x">첫번째 직선의 첫번째 x 좌표</param>
	/// <param name="l1y">첫번째 직선의 첫번째 y 좌표</param>
	/// <param name="l1x2">첫번째 직선의 두번째 x 좌표</param>
	/// <param name="l1y2">첫번째 직선의 두번째 y 좌표</param>
	/// <param name="l2x">두번째 직선의 첫번째 x 좌표</param>
	/// <param name="l2y">두번째 직선의 첫번째 y 좌표</param>
	/// <param name="l2x2">두번째 직선의 두번째 x 좌표</param>
	/// <param name="l2y2">두번째 직선의 두번째 y 좌표</param>
	/// <param name="rx">교차 x 좌표</param>
	/// <param name="ry">교차 y 좌표</param>
	/// <returns>교차 여부</returns>
	bool GetIntersectionLineLine(double l1x, double l1y, double l1x2, double l1y2,
		double l2x, double l2y, double l2x2, double l2y2, double* rx, double* ry);

	/// <summary>
	/// 직선과 점 사이의 교차 여부를 반환한다
	/// </summary>
	/// <param name="l1x">직선의 첫번째 x 좌표</param>
	/// <param name="l1y">직선의 첫번째 y 좌표</param>
	/// <param name="l1x2">직선의 두번째 x 좌표</param>
	/// <param name="l1y2">직선의 두번째 y 좌표</param>
	/// <param name="p1x">포인트 x 좌표</param>
	/// <param name="p1y">포인트 y 좌표</param>
	/// <returns>직선과 점 사이 의 교차 여부</returns>
	bool IsIntersectLinePoint(double l1x, double l1y, double l1x2, double l1y2,
		double p1x, double p1y);

	/// <summary>
	/// src와 comp 사이의 교차점을 계산한다
	/// </summary>
	/// <param name="src">src group</param>
	/// <param name="comp">comp group</param>
	/// <param name="plist">교차점 리스트</param>
	void CalculatePreviewIntersection(shared_ptr<Group> src, shared_ptr<Group> comp, shared_ptr<PointList> plist);

	/// <summary>
	/// 두 선분 사이의 교점을 구한다
	/// </summary>
	/// <param name="srcStartPoint">src 시작점</param>
	/// <param name="srcEndPoint">src 끝점</param>
	/// <param name="compStartPoint">comp 시작점</param>
	/// <param name="compEndPoint">comp 끝점</param>
	/// <returns>두 선분 사이의 교점</returns>
	Vector3 GetIntersectionPoint(Vector3 srcStartPoint, Vector3 srcEndPoint, Vector3 compStartPoint, Vector3 compEndPoint);
}