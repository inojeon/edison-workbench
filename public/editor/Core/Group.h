#pragma once

namespace RayCad
{
	class PointList;

	/// <summary>
	/// Geometry 그룹 클래스
	/// </summary>
	class Group : public Geom {
	public:
		// 이곳에 matrix추가. 
		// 태깅 추가. 
		// 

		/// <summary>
		/// 그룹의 태그 사이즈
		/// </summary>
		int _tokenSize;

		/// <summary>
		/// group 내의 geom 리스트
		/// </summary>
		vector< shared_ptr<Geom>> _list;

		/// <summary>
		/// 렌더링 영역을 의미하는 바운딩 박스
		/// </summary>
		shared_ptr<BoundingBox2> _bbox2;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Group();

		/// <summary>
		/// 소멸자 : 그룹 내 리스트를 모두 제거한다
		/// </summary>
		virtual ~Group();

		/// <summary>
		/// 그룹에 Geom 추가
		/// </summary>
		/// <param name="geom">추가할 Geom</param>
		/// <returns>추가된 인덱스</returns>
		int Add(shared_ptr<Geom> geom);

		/// <summary>
		/// index에 해당하는 그룹 내 Geom을 반환
		/// </summary>
		/// <param name="index">찾고자 하는 인덱스</param>
		/// <returns>찾아낸 Geom 객체 포인터</returns>
		shared_ptr<Geom> Get(int index);

		/// <summary>
		/// 그룹 리스트 사이즈 반환
		/// </summary>
		/// <returns>그룹 사이즈</returns>
		int GetNumberOfChildren();
		
		/// <summary>
		/// 그룹 내 리스트 클리어
		/// </summary>
		void Clear();

		/// <summary>
		/// 객체를 복제한다
		/// </summary>
		/// <returns>복제된 객체의 포인터</returns>
		virtual shared_ptr<Geom> Clone();

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
		/// <param name="z">점의 z 좌표</param>
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
		/// 그룹 태그 설정
		/// </summary>
		/// <param name="tag">태그 문자열</param>
		void SetTag(string tag);

		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		virtual std::string GetTypeName();

		/// <summary>
		/// 메모리 블럭에 그룹에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">그룹의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// 그룹의 정보를 바이너리로 변환 시 크기를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 그룹 헤더의 정보를 바이너리로 변환 시 크기를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		int GetGroupHeaderBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 객체의 렌더링 프리뷰 추가
		/// </summary>
		/// <param name="preview">렌더링 프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);

		/// <summary>
		/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 위한 지점들을 구한다
		/// </summary>
		/// <param name="plist">AuxUIPoints를 저장할 변수</param>
		virtual void GetAuxUIPoints(shared_ptr <PointList> plist);

		/// <summary>
		/// 그룹 리스트 원소들과 주어진 바운딩 박스 간 교차점을 갖는 원소들을 찾아낸다
		/// </summary>
		/// <param name="bbox">바운딩 박스</param>
		/// <param name="result">바운딩 박스와 교차점을 갖는 원소들의 그룹</param>
		void GetIntersectList(shared_ptr<BoundingBox2> bbox, shared_ptr<Group> result);
		
		/// <summary>
		/// 그룹 내 원소끼리의 교차점을 구한다
		/// </summary>
		/// <param name="plist">교차점을 저장할 변수</param>
		void GetIntersectPointList(shared_ptr<PointList> plist);

		/// <summary>
		/// 바운딩 박스를 반환한다
		/// </summary>
		/// <returns>바운딩 박스</returns>
		virtual shared_ptr<BoundingBox2> GetBoundingBox2();

		/// <summary>
		/// 분해 기능을 수행한다
		/// </summary>
		/// <returns>분해 기능을 거친 기하 오브젝트의 그룹</returns>
		virtual shared_ptr<Group> Explode();

		/// <summary>
		/// 주어진 매트릭스를 기준으로 변환 과정을 수행한다
		/// </summary>
		/// <param name="mat">변환에 사용될 매트릭스</param>
		virtual void Transform(shared_ptr<Matrix4> mat);

		/// <summary>
		/// 주어진 직선과 맞닿는 지점이 있는지 판별 후 해당 지점을 반환한다
		/// </summary>
		/// <param name="st_pt">직선의 시작점</param>
		/// <param name="dir">직선의 방향</param>
		/// <returns>직선의 교차점. 존재하지 않을 시엔 시작점을 반환한다</returns>
		virtual Vector3 GetIntersectionForExtend(Vector3 st_pt, Vector3 dir);

		/// <summary>
		/// 폰트 사이즈를 설정한다
		/// </summary>
		/// <param name="width">너비</param>
		/// <param name="height">높이</param>
		void FontSize(double width, double height);

		/// <summary>
		/// 문자열을 생성한다
		/// </summary>
		/// <param name="data">문자열</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="align">align 모드</param>
		void GenerateString(string data, double x, double y, int align = 0);

		/// <summary>
		/// id에 해당하는 child를 반환한다
		/// </summary>
		/// <param name="id">geom id</param>
		/// <returns>id에 해당하는 geom</returns>
		shared_ptr<Geom> FindChild(int id);
	};

	/// <summary>
	/// group의 종료를 알리는 클래스
	/// </summary>
	class EndGroup : public Geom {
	public:
		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		EndGroup();

		/// <summary>
		/// 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>오브젝트 타입명</returns>
		std::string GetTypeName();
	};

}