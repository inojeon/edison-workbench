#pragma once

namespace RayCad
{
	/// <summary>
	/// PLine Geometry 클래스
	/// </summary>
	class PLine : public PointList {
	public:

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		PLine();

		/// <summary>
		/// 객체를 복제한다
		/// </summary>
		/// <returns>복제된 객체의 포인터</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		virtual string GetTypeName();

		/// <summary>
		/// 기하 오브젝트와 점 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <returns>점과 기하 오브젝트 사이의 거리</returns>
		virtual double distance2(double x, double y);

		/// <summary>
		/// 기하 오브젝트와 점 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <returns>점과 기하 오브젝트 사이의 거리</returns>
		virtual double distance3(double x, double y, double z);

		/// <summary>
		/// 기하 오브젝트와 레이 세그먼트 사이의 거리를 구한다
		/// </summary>
		/// <param name="ox">레이 시작점의 x 좌표</param>
		/// <param name="oy">레이 시작점의 y 좌표</param>
		/// <param name="oz">레이 시작점의 z 좌표</param>
		/// <param name="dx">레이 방향 벡터의 x 성분</param>
		/// <param name="dy">레이 방향 벡터의 y 성분</param>
		/// <param name="dz">레이 방향 벡터의 z 성분</param>
		/// <returns>점과 기하 오브젝트 사이의 거리</returns>
		virtual double distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz);

		/// <summary>
		/// 프리뷰 렌더링을 할 오브젝트 생성
		/// </summary>
		/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);

		/// <summary>
		/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 위한 지점들을 구한다
		/// </summary>
		/// <param name="plist">AuxUIPoints를 저장할 변수</param>
		virtual void GetAuxUIPoints(shared_ptr <PointList> plist);

		/// <summary>
		/// 렌더링 영역을 나타내는 바운딩 박스를 반환한다
		/// </summary>
		/// <returns>바운딩 박스</returns>
		virtual shared_ptr<BoundingBox2> GetBoundingBox2();

		/// <summary>
		/// 주어진 바운딩 박스와의 교차 여부를 반환한다
		/// </summary>
		/// <param name="bbox2">비교할 바운딩 박스</param>
		/// <returns>교차 여부</returns>
		virtual bool IsBoxIntersect(shared_ptr<BoundingBox2> bbox2);

		/// <summary>
		/// 분해 기능을 수행한다
		/// </summary>
		/// <returns>분해 기능을 거친 결과 그룹</returns>
		virtual shared_ptr<Group> Explode();

		/// Trim 변환을 수행한다.
		/// </summary>
		/// <param name="refGeom">trim 할 참조 geom</param>
		/// <param name="bTrimFirst">Trim 할 객체 부분을 선택</param>
		/// <returns>Trimmed Object</returns>
		virtual shared_ptr<Group> Trim(shared_ptr<Geom> refGeom, bool bTrimFirst = true);

		/// <summary>
		/// 선분 위의 점 origin을 클릭했을 때, 그룹 내의 원소와 선분 간의 교점을 고려하여 trim 후의 결과물을 반환한다.
		/// </summary>
		/// <param name="target">선분과의 교점을 고려해야할 그룹</param>
		/// <param name="origin">Trim의 기준점</param>
		/// <returns>Trim된 결과물</returns>
		shared_ptr<Group> Trim(shared_ptr<Group> target, shared_ptr<Point> origin);

		/// <summary>
		/// Extend 변환을 수행한다.
		/// </summary>
		/// <param name="refGeom">extend 할 참조 geom</param>
		virtual void Extend(shared_ptr<Geom> refGeom);



		/// <summary>
		/// 
		/// </summary>
		/// <param name="centerx"></param>
		/// <param name="centery"></param>
		/// <param name="spx"></param>
		/// <param name="spy"></param>
		/// <param name="number"></param>
		void GeneratePolygon(double centerx, double centery, double centerz, double spx, double spy, double spz, int number, double nx, double ny, double nz);

		/// <summary>
		/// pline과 compareGeom 사이의 교점을 plist에 저장한다
		/// </summary>
		/// <param name="compareGeom">비교할 대상</param>
		/// <param name="plist">교점이 저장될 변수</param>
		virtual void GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist);

		/// <summary>
		/// 주어진 직선과 맞닿는 지점이 있는지 판별 후 해당 지점을 반환한다
		/// </summary>
		/// <param name="st_pt">직선의 시작점</param>
		/// <param name="dir">직선의 방향</param>
		/// <returns>직선의 교차점. 존재하지 않을 시엔 시작점을 반환한다</returns>
		virtual Vector3 GetIntersectionForExtend(Vector3 st_pt, Vector3 dir);

	};
}