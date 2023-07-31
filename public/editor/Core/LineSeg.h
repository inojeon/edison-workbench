#pragma once

namespace RayCad
{
	/// <summary>
	/// 라인 Geometry 클래스
	/// </summary>
	class LineSeg: public Geom {
	public:
		/// <summary>
		/// 선분의 시작점
		/// </summary>
		Vector3 _p1;
		/// <summary>
		/// 선분의 끝점
		/// </summary>
		Vector3 _p2;
		/// <summary>
		/// 렌더링 영역을 나타내는 바운딩 박스
		/// </summary>
		shared_ptr<BoundingBox2> _bbox2;

		/// <summary>
		/// Line seg 타입
		/// </summary>
		enum def_type {
			TWO_POINTS,
			POINT_ANGLE,
		};
		
		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		///	선분의 시작과 끝점의 좌표를 0으로 설정한다
		/// </summary>
		LineSeg();

		/// <summary>
		/// 선분의 시작점과 끝점을 지정
		/// </summary>
		/// <param name="x1">시작점의 x 좌표</param>
		/// <param name="y1">시작점의 y 좌표</param>
		/// <param name="z1">시작점의 z 좌표</param>
		/// <param name="x2">끝점의 x 좌표</param>
		/// <param name="y2">끝점의 y 좌표</param>
		/// <param name="z2">끝점의 z 좌표</param>		
		void Set(double x1, double y1, double z1, double x2, double y2, double z2);

		/// <summary>
		/// 선분의 시작점과 끝점을 설정한다
		/// </summary>
		/// <param name="p1">시작점의 좌표</param>
		/// <param name="p2">끝점의 좌표</param>
		void Set(Vector3 p1, Vector3 p2);

		/// <summary>
		/// 선분의 좌표를 가져온다
		/// </summary>
		/// <param name="index">0: 시작점, 1: 끝점</param>
		/// <returns>선분의 좌표</returns>
		Vector3 Get(int index);
		
		/// <summary>
		/// 좌표와 선분 사이의 거리
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <returns>좌표와 선분 사이의 거리</returns>
		virtual double distance2(double x, double y);

		/// <summary>
		/// 3차원 좌표와 선분 사이의 거리
		/// </summary>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		/// <returns>좌표와 선분 사이의 거리</returns>
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
		/// 메모리 블럭에 선분에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">선분의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// 선분의 정보를 바이너리로 변환 시 크기를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 프리뷰 렌더링을 할 오브젝트 생성
		/// </summary>
		/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);

		/// <summary>
		/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 이한 지점들
		/// </summary>
		/// <param name="plist">AuxUIPoints를 저장할 변수</param>
		virtual void GetAuxUIPoints(shared_ptr <PointList> plist);

		/// <summary>
		/// 바운딩 박스를 반환한다
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
		/// 주어진 매트릭스를 기준으로 변환 과정을 수행한다
		/// </summary>
		/// <param name="mat">변환에 사용될 매트릭스</param>
		virtual void Transform(shared_ptr<Matrix4> mat);


		/// <summary>
		/// 오프셋 변환을 수행한다.
		/// </summary>
		/// <param name="value">오프셋 값</param>
		virtual void Offset(double value);

		/// <summary>
		/// 주어진 comopareGeom과의 교차점을 plist에 추가한다
		/// </summary>
		/// <param name="compareGeom">비교할 Geometry</param>
		/// <param name="plist">교점을 추가할 변수</param>
		virtual void GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist);


		/// <summary>
		/// 주어진 직선과 맞닿는 지점이 있는지 판별 후 해당 지점을 반환한다
		/// </summary>
		/// <param name="st_pt">직선의 시작점</param>
		/// <param name="dir">직선의 방향</param>
		/// <returns>직선의 교차점. 존재하지 않을 시엔 시작점을 반환한다</returns>
		virtual Vector3 GetIntersectionForExtend(Vector3 st_pt, Vector3 dir);

		/// Trim 변환을 수행한다.
		/// </summary>
		/// <param name="refGeom">trim 할 참조 geom</param>
		/// <param name="bTrimFirst">Trim 할 객체 부분을 선택</param>
		/// <returns>Trimmed Object</returns>
		virtual shared_ptr<Group> Trim(shared_ptr<Geom> refGeom, bool bTrimFirst = true);

		/// <summary>
		/// Extend 변환을 수행한다.
		/// </summary>
		/// <param name="refGeom">extend 할 참조 geom</param>
		virtual void Extend(shared_ptr<Geom> refGeom);

		/// <summary>
		/// 선분 위의 점 origin을 클릭했을 때, 그룹 내의 원소와 선분 간의 교점을 고려하여 trim 후의 결과물을 반환한다.
		/// </summary>
		/// <param name="target">선분과의 교점을 고려해야할 그룹</param>
		/// <param name="origin">Trim의 기준점</param>
		/// <returns>Trim된 결과물</returns>
		shared_ptr<Group> Trim(shared_ptr<Group> target, shared_ptr<Point> origin);
		
		/// <summary>
		/// line segment 상에서 point의 상대적 위치를 구한다. (p1: 0.0, p2: 1.0)
		/// </summary>
		/// <param name="point">상대적 위치를 구하고자 하는 선분 위의 점</param>
		/// <returns>상대적 위치</returns>
		double GetPortion(Vector3 point);

		/// <summary>
		/// LineSeg 정보를 문자열로 반환한다
		/// </summary>
		/// <returns>LineSeg 정보</returns>
		virtual string toString();

		/*
		/// <summary>
		/// Align 변환을 수행한다.
		/// </summary>
		/// <param name="bx1">base 점 #1 x 좌표</param>
		/// <param name="by1">base 점 #1 y 좌표</param>
		/// <param name="tx1">target 점 #1 x 좌표</param>
		/// <param name="ty1">target 점 #1 y 좌표</param>
		/// <param name="bx2">base 점 #2 x 좌표</param>
		/// <param name="by2">base 점 #2 y 좌표</param>
		/// <param name="tx2">target 점 #2 x 좌표</param>
		/// <param name="ty2">target 점 #2 y 좌표</param>
		virtual void Align(double bx1, double by1, double tx1, double ty1, double bx2, double by2, double tx2, double ty2);
		*/

	};
}