#pragma once
namespace RayCad
{
	class PointList;

	/// <summary>
	/// 2D Arc2 Geometry 클래스 (중심점, 원호상의 두 점으로 정의)
	/// </summary>
	class Arc2 : public Geom {
	public:

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Arc2();

		/// <summary>
		/// 기하 오브젝트의 영역을 나타내는 변수
		/// </summary>
		shared_ptr<BoundingBox2> _bbox2;

        /// <summary>
        /// 호의 중심점
        /// </summary>
        Vector3 _center;

		/// <summary>
		/// 호의 반지름
		/// </summary>
		cad_type _radius;

		/// <summary>
		/// 호의 시작점
		/// </summary>
		Vector3 _pt_st;
		/// <summary>
		/// 호의 끝점
		/// </summary>
		Vector3 _pt_ed;

		/// <summary>
		/// 호의 normal
		/// </summary>
		Vector3 _normal;

		/// <summary>
		/// 호의 중심, 반지름, 시작점, 끝점을 지정한다.
		/// </summary>
		/// <param name="x">중심 x 좌표</param>
		/// <param name="y">중심 y 좌표</param>
		/// <param name="z">중심 z 좌표</param>
		/// <param name="radius">호의 반지름</param>
		/// <param name="st_x">시작점 x 좌표</param>
		/// <param name="st_y">시작점 y 좌표</param>
		/// <param name="st_z">시작점 z 좌표</param>
		/// <param name="ed_x">끝점 x 좌표</param>
		/// <param name="ed_y">끝점 y 좌표</param>
		/// <param name="ed_z">끝점 z 좌표</param>
		void Set(cad_type x, cad_type y, cad_type z, cad_type radius, cad_type st_x, cad_type st_y, cad_type st_z, cad_type ed_x, cad_type ed_y, cad_type ed_z);
		
		/// <summary>
		/// 호의 normal을 설정한다.
		/// </summary>
		/// <param name="nx">normal x</param>
		/// <param name="ny">normal y</param>
		/// <param name="nz">normal z</param>
		void SetNormal(cad_type nx, cad_type ny, cad_type nz);

		/// <summary>
		/// 반지름 정보를 가져온다
		/// </summary>
		/// <returns>반지름의 길이</returns>
		cad_type GetRadius();

		/// <summary>
		/// 호의 시작 각도를 반환한다 (degree 기준)
		/// </summary>
		/// <returns>호의 시작 각도</returns>
		cad_type GetAngleStart();

		/// <summary>
		/// 호의 끝 각도를 반환한다 (degree 기준)
		/// </summary>
		/// <returns>호의 끝 각도</returns>
		cad_type GetAngleEnd();

		/// <summary>
		/// 호의 중점 각도를 반환한다 (degree 기준)
		/// </summary>
		/// <returns>호의 중점 각도</returns>
		cad_type GetAngleMid();

		/// <summary>
		/// 호 궤적 위에 점의 각도를 반환한다 (degree 기준)
		/// </summary>
		/// <param name="x">호 위의 x 좌표</param>
		/// <param name="y">호 위의 y 좌표</param>
		/// <returns>각도</returns>
		cad_type GetAngle(double x, double y, double z);

		/// <summary>
		/// 중심점의 x 좌표를 반환한다
		/// </summary>
		/// <returns>중심 x 좌표</returns>
		cad_type GetX();
		/// <summary>
		/// 중심점의 y 좌표를 반환한다
		/// </summary>
		/// <returns>중심 y 좌표</returns>
		cad_type GetY();
		/// <summary>
		/// 중심점의 z 좌표를 반환한다
		/// </summary>
		/// <returns>중심 z 좌표</returns>
		cad_type GetZ();

		/// <summary>
		/// 호의 중심 좌표 정보 반환
		/// </summary>
		/// <returns>호의 중심 좌표</returns>
		Vector3 GetCenter();

		/// <summary>
		/// 호의 시작 좌표를 반환한다
		/// </summary>
		/// <returns>시작 좌표</returns>
		Vector3 GetStart();

		/// <summary>
		/// 호의 시작 x 좌표를 반환한다
		/// </summary>
		/// <returns>호의 시작 x 좌표</returns>
		cad_type GetStartX();
		/// <summary>
		/// 호의 시작 y 좌표를 반환한다
		/// </summary>
		/// <returns>호의 시작 y 좌표</returns>
		cad_type GetStartY();
		/// <summary>
		/// 호의 시작 z 좌표를 반환한다
		/// </summary>
		/// <returns>호의 시작 z 좌표</returns>
		cad_type GetStartZ();

		/// <summary>
		/// 호의 종료 좌표
		/// </summary>
		/// <returns>종료 좌표</returns>
		Vector3 GetEnd();

		/// <summary>
		/// 호의 종료 x 좌표를 반환한다
		/// </summary>
		/// <returns>호의 종료 x 좌표</returns>
		cad_type GetEndX();
		/// <summary>
		/// 호의 종료 y 좌표를 반환한다
		/// </summary>
		/// <returns>호의 종료 y 좌표</returns>
		cad_type GetEndY();
		/// <summary>
		/// 호의 종료 z 좌표를 반환한다
		/// </summary>
		/// <returns>호의 종료 z 좌표</returns>
		cad_type GetEndZ();

		/// <summary>
		/// 호의 중점 좌표
		/// </summary>
		/// <returns>중점 좌표</returns>
		Vector3 GetMidPoint();

		/// <summary>
		/// 2차원 상의 점과 호 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <returns>점과 호 사이의 거리</returns>
		virtual double distance2(double x, double y);

		/// <summary>
		/// 3차원 상의 점과 호 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <param name="z">점의 z 좌표</param>
		/// <returns>점과 호 사이의 거리</returns>
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
		/// 메모리 블럭에 호에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">호의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// 호의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		virtual string GetTypeName();

		/// <summary>
		/// 객체의 렌더링 프리뷰 추가
		/// </summary>
		/// <param name="preview">렌더링 프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);
		
		/// <summary>
		/// 오브젝트 피킹 시 활용되는 지점을 구한다
		/// </summary>
		/// <param name="plist">점들을 저장할 변수</param>
		virtual void GetAuxUIPoints(shared_ptr <PointList> plist);
		
		/// <summary>
		/// 바운딩 박스를 반환한다
		/// </summary>
		/// <returns>바운딩 박스</returns>
		virtual shared_ptr<BoundingBox2> GetBoundingBox2();

		/// <summary>
		/// 객체와 비교 객체 간 교점을 저장한다
		/// </summary>
		/// <param name="compareGeom">비교할 객체</param>
		/// <param name="plist">교점이 저장될 공간</param>
		virtual void GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist);
	

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
		/// 주어진 3점으로 부터 Arc를 생성한다. 시작점과 종점은 angle에 따라 변할 수 있다.
		/// </summary>
		/// <param name="x1">Arc의 x 좌표 1 (시작점 혹은 종점)</param>
		/// <param name="y1">Arc의 y 좌표 1 (시작점 혹은 종점)</param>
		/// <param name="x2">Arc의 x 좌표 2</param>
		/// <param name="y2">Arc의 y 좌표 2</param>
		/// <param name="x3">Arc의 x 좌표 3 (시작점 혹은 종점)</param>
		/// <param name="y3">Arc의 y 좌표 3 (시작점 혹은 종점)</param>
		void SetFromThreePoint(double x1, double y1, double z1, double x2, double y2, double z2, double x3, double y3, double z3);

		/// <summary>
		/// 주어진 2점과 반지름으로 부터 Arc를 생성한다. 시작점과 종점은 주어진 순서에 따라 고정이다. 
		/// (반지름이 너무 짧은 경우, 강제로 늘린다.)
		/// </summary>
		/// <param name="x1">시작 x 좌표</param>
		/// <param name="y1">시작 y 좌표</param>
		/// <param name="x2">종료 x 좌표</param>
		/// <param name="y2">종료 y 좌표</param>
		/// <param name="radius">호으 ㅣ반지름</param>
		void SetFromSER(double x1, double y1, double z1, double x2, double y2, double z2, double radius);


		/// <summary>
		/// arc 의 정보를 문자열로 반환한다.
		/// </summary>
		/// <returns>arc 문자열 정보</returns>
		virtual string toString();
	};
}