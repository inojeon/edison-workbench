#pragma once



namespace RayCad
{

	class PointList;

	/// <summary>
	/// Circle Geometry 클래스
	/// </summary>
	class Circle : public Geom {
	public:

		/// <summary>
		/// 원의 중심점
		/// </summary>
		Vector3 _center;
		/// <summary>
		/// 원의 반지름
		/// </summary>
		cad_type _radius;

		/// <summary>
		/// 원의 normal
		/// </summary>
		Vector3 _normal;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Circle();

		/// <summary>
		/// 기하 오브젝트의 영역을 나타내는 변수
		/// </summary>
		shared_ptr<BoundingBox2> _bbox2;

		/// <summary>
		/// 원에 대한 정보를 설정한다
		/// </summary>
		/// <param name="x">중심 x 좌표</param>
		/// <param name="y">중심 y 좌표</param>
		/// <param name="z">중심 z 좌표</param>
		/// <param name="radius">반지름</param>
		void Set(cad_type x, cad_type y, cad_type z, cad_type radius);

		/// <summary>
		/// 원의 normal을 설정한다.
		/// </summary>
		/// <param name="nx">x normal</param>
		/// <param name="ny">y normal</param>
		/// <param name="nz">z normal</param>
		void SetNormal(cad_type nx, cad_type ny, cad_type nz);

		/// <summary>
		/// 주어진 좌표와 원 사이의 거리를 측정한다
		/// </summary>
		/// <param name="x">주어진 점의 x 좌표</param>
		/// <param name="y">주어진 점의 y 좌표</param>
		/// <returns>원과 좌표 간의 거리</returns>
		virtual double distance2(double x, double y);

		/// <summary>
		/// 주어진 좌표와 원 사이의 거리를 측정한다
		/// </summary>
		/// <param name="x">주어진 점의 x 좌표</param>
		/// <param name="y">주어진 점의 y 좌표</param>
		/// <param name="z">주어진 점의 z 좌표</param>
		/// <returns>원과 좌표 간의 거리</returns>
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
		/// 메모리 블럭에 원에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">원의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// 원의 정보를 바이너리로 변환 시 크기를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

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
		/// 원의 중심 좌표 정보 반환
		/// </summary>
		/// <returns>원의 중심 좌표</returns>
		Vector3 GetCenter();

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
		/// 반지름을 반환한다
		/// </summary>
		/// <returns>반지름</returns>
		cad_type GetRadius();

		/// <summary>
		/// 바운딩 박스를 반환한다
		/// </summary>
		/// <returns>바운딩 박스</returns>
		virtual shared_ptr<BoundingBox2> GetBoundingBox2();

		/// <summary>
		/// 객체와 비교 객체 간 교점을 저장한다
		/// </summary>
		/// <param name="compareGeom">비교할 객체</param>
		/// <param name="plist">저장될 공간</param>
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
		/// 두 점의 연결선을 지름으로 하는 원을 생성한다
		/// </summary>
		/// <param name="x1">첫번째 x 좌표</param>
		/// <param name="y1">첫번째 y 좌표</param>
		/// <param name="x2">두번째 x 좌표</param>
		/// <param name="y2">두번째 y 좌표</param>
		void SetFromTwoPoint(double x1, double y1, double z1, double x2, double y2, double z2);
	
		/// <summary>
		/// 세 점을 지나는 원을 생성한다.
		/// </summary>
		/// <param name="x1">첫번째 x 좌표</param>
		/// <param name="y1">첫번째 y 좌표</param>
		/// <param name="x2">두번째 x 좌표</param>
		/// <param name="y2">두번째 y 좌표</param>
		/// <param name="x3">세번째 x 좌표</param>
		/// <param name="y3">세번째 y 좌표</param>
		void SetFromThreePoint(double x1, double y1, double z1, double x2, double y2, double z2, double x3, double y3, double z3);
	};
}
