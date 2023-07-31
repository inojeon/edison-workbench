#pragma once


namespace RayCad
{
	class Group;
	class PointList;
	class Material;
	class KRFTextParser;

	/// <summary>
	/// Geometry 베이스 클래스
	/// </summary>
	class Geom : public std::enable_shared_from_this<Geom> {
	public:

		enum geom_type {
			G_POINT = 0,
			G_LINE = 1,
			G_PLINE = 2,
			G_POLYGON = 3,
			G_CIRCLE = 4,
			G_ARC = 5,
			G_GROUP = 6,
			G_SPHERE = 7,
			G_CYLINDER = 8,
			G_MESH = 9,
			G_MATERIAL = 10,
			G_SPLINE = 11,
			G_ENDGROUP = 12,
			G_POINTLIST = 13,
			G_PROTEIN_TRAJECTORY = 14,
			G_ARC2 = 15,
			G_DIM = 16,
			G_ATOM = 17,
			G_BOND = 18, 

			G_DNAARM = 19,

			G_EXTRADATA = 1000,
		};

		//shared_ptr<PointList> _plist;
		int _id;
		short _type;
		//string _material;
		shared_ptr<Tag> _tag;
		shared_ptr <Material> _material;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Geom();


		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		virtual std::string GetTypeName();

		/// <summary>
		/// 기하 오브젝트의 enum을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입의 enum 값</returns>
		virtual int GetType();

		/// <summary>
		/// 기하 오브젝트의 아이디를 반환한다
		/// </summary>
		/// <returns>기하 오브젝트 아이디</returns>
		virtual int GetID();

		/// <summary>
		/// 기하 오브젝트의 아이디를 설정한다
		/// </summary>
		/// <param name="id">설정할 아이디 값</param>
		virtual void SetID(int id);

		/// <summary>
		/// 태그를 설정한다
		/// </summary>
		/// <param name="data">태그</param>
		virtual void SetTag(string data);

		//virtual void SetPList(shared_ptr<PointList> plist);

		/// <summary>
		/// 기하 오브젝트의 머터리얼을 반환한다
		/// </summary>
		/// <returns>기하 오브젝트 머터리얼</returns>
		virtual shared_ptr<Material> GetMaterial();

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
		/// 메모리 블럭에 기하 오브젝트에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock *data, int &ptr);

		/// <summary>
		/// 기하 오브젝트를 KRF 형식에 맞는 문자열로 변환하여 주어진 clist에 추가한다
		/// </summary>
		/// <param name="clist">KRF 문자열이 추가될 커멘드 리스트</param>
		virtual void AddCommand(KRFTextParser* parser, shared_ptr<CommandList> clist);
		
		/// <summary>
		/// 기하 오브젝트의 정보를 바이너리로 변환 시 크기를 반환한다
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
		/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 위한 지점들을 구한다
		/// </summary>
		/// <param name="plist">AuxUIPoints를 저장할 변수</param>
		virtual void GetAuxUIPoints(shared_ptr <PointList> plist);

		/// <summary>
		/// key에 대한 태그 값을 가져온다
		/// </summary>
		/// <param name="key">태그 키</param>
		/// <returns>태그</returns>
		virtual string GetTag(string key);

		/// <summary>
		/// 바운딩 박스를 반환한다
		/// </summary>
		/// <returns>바운딩 박스</returns>
		virtual shared_ptr<BoundingBox2> GetBoundingBox2();

		/// <summary>
		/// 다른 기하 오브젝트와 교차점을 구한다
		/// </summary>
		/// <param name="compareGeom">비교 기하 오브젝트</param>
		/// <param name="plist">교차점을 저장할 변수</param>
		virtual void GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist);
		
		/// <summary>
		/// 주어진 바운딩 박스와 교차여부를 반환한다
		/// </summary>
		/// <param name="bbox2">교차 여부를 확인할 바운딩 박스</param>
		/// <returns>교차 여부</returns>
		virtual bool IsBoxIntersect(shared_ptr<BoundingBox2> bbox2);

		/// <summary>
		/// 인자로 주어진 바운딩 박스를 포함하는지 확인한다
		/// </summary>
		/// <param name="bbox2">포함 여부를 확인할 바운딩 박스</param>
		/// <returns>포함 여부</returns>
		virtual bool IsBoxContain(shared_ptr<BoundingBox2> bbox2);

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
		/// Extend 변환을 수행한다.
		/// </summary>
		/// <param name="refGeom">extend 할 참조 geom</param>
		virtual void Extend(shared_ptr<Geom> refGeom);

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
		/// <param name="bApplyScale">Scale 변환 적용 여부</param>
		virtual void Align(double bx1, double by1, double tx1, double ty1, double bx2, double by2, double tx2, double ty2, bool bApplyScale = false);

		/// <summary>
		/// Geom 객체 정보를 문자열로 반환한다.
		/// </summary>
		/// <returns>Geom 정보</returns>
		virtual string toString();

	};
}