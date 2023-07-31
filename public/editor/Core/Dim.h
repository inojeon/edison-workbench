#pragma once
namespace RayCad
{
	/// <summary>
	/// 2D 치수 Geometry 클래스
	/// </summary>
	class Dim : public Geom {
	public:

		/// <summary>
		/// 치수 타입
		/// </summary>
		enum dim_type {
			DIM_LENGTH = 0,
			DIM_ANGLE = 1,
			DIM_DIAMETER = 2,
			DIM_RADIUS = 3,
		};

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Dim();

		/// <summary>
		/// preview 오브젝트
		/// </summary>
		shared_ptr<Group> _preview;

		string _message;

		/// <summary>
		/// 시작점
		/// </summary>
		Vector3 _p1;
		/// <summary>
		/// 끝점
		/// </summary>
		Vector3 _p2; // anble 일 때 중심점. 

		Vector3 _p3;

		/// 반지름
		/// </summary>
		double _radius;

		/// <summary>
		/// 폰트 너비
		/// </summary>
		double _fontWidth;
		/// <summary>
		/// 폰트 높이
		/// </summary>
		double _fontHeight;

		/// <summary>
		/// 치수선 오프셋
		/// </summary>
		cad_type _offset;

		/// <summary>
		/// 연장선 각도
		/// </summary>
		cad_type _angle;

		/// <summary>
		/// 대상 오브젝트 ID
		/// </summary>
		int _refID;

		/// <summary>
		/// 대상 오브젝트 타입
		/// </summary>
		int _refType;

		/// <summary>
		/// 치수 타입
		/// </summary>
		int _dimType;

		/// <summary>
		/// 치수 대상 오브젝트의 ID를 설정한다.
		/// </summary>
		/// <param name="id">오브젝트 ID</param>
		void SetRefID(int id);

		/// <summary>
		/// 치수 대상 오브젝트의 ID를 리턴한다.
		/// </summary>
		/// <returns>오브젝트 ID</returns>
		int GetRefID();

		/// <summary>
		/// 치수 정보를 설정한다.
		/// </summary>
		/// <param name="pGeom">대상 오브젝트</param>
		/// <param name="offset">치수선 길이</param>
		/// <param name="ex_length">치수 연장선 길이</param>
		/// <param name="ex_angle">치수 연장선 각도</param>
		void Set(std::shared_ptr<Geom> pGeom, int type, cad_type offset, cad_type ex_length, cad_type ex_angle);

		/// <summary>
		/// 각도 정보를 설정한다
		/// </summary>
		/// <param name="p1x">첫번째 점의 x 좌표</param>
		/// <param name="p1y">첫번째 점의 y 좌표</param>
		/// <param name="p2x">두번째 점의 x 좌표</param>
		/// <param name="p2y">두번째 점의 y 좌표</param>
		/// <param name="p3x">세번째 점의 x 좌표</param>
		/// <param name="p3y">세번째 점의 y 좌표</param>
		/// <param name="offset">offset 값</param>
		void SetAngle(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type p3x, cad_type p3y, cad_type offset);
		
		/// <summary>
		/// 길이 정보를 설정한다
		/// </summary>
		/// <param name="p1x">첫번째 점의 x 좌표</param>
		/// <param name="p1y">첫번째 점의 y 좌표</param>
		/// <param name="p2x">두번째 점의 x 좌표</param>
		/// <param name="p2y">두번째 점의 y 좌표</param>
		/// <param name="offset">offset 값</param>
		void SetLength(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type offset);

		/// <summary>
		/// 직경 정보를 설정한다
		/// </summary>
		/// <param name="p1x">첫번째 점의 x 좌표</param>
		/// <param name="p1y">첫번째 점의 x 좌표</param>
		/// <param name="p2x">첫번째 점의 x 좌표</param>
		/// <param name="p2y">첫번째 점의 x 좌표</param>
		/// <param name="p3x">첫번째 점의 x 좌표</param>
		/// <param name="p3y">첫번째 점의 x 좌표</param>
		/// <param name="ex_len"></param>
		/// <param name="ex_angle"></param>
		void SetDiameter(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type p3x, cad_type p3y, cad_type ex_len, cad_type ex_angle);

		/// <summary>
		/// 반지름을 설정한다
		/// </summary>
		/// <param name="p1x">첫번째 점의 x 좌표</param>
		/// <param name="p1y">첫번째 점의 y 좌표</param>
		/// <param name="p2x">두번째 점의 x 좌표</param>
		/// <param name="p2y">두번째 점의 y 좌표</param>
		/// <param name="p3x">세번째 점의 x 좌표</param>
		/// <param name="p3y">세번째 점의 y 좌표</param>
		/// <param name="ex_len">길이</param>
		/// <param name="ex_angle">각도</param>
		void SetRadius(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type p3x, cad_type p3y, cad_type offset, cad_type ex_angle);

		/// <summary>
		/// 폰트 사이즈를 설정한다
		/// </summary>
		/// <param name="width">너비</param>
		/// <param name="height">높이</param>
		void SetFontSize(double width, double height);


		/// <summary>
		/// 확장 사이즈를 설정한다
		/// </summary>
		/// <param name="ex_len">확장 길이</param>
		/// <param name="ex_ang">확장 각도</param>
		void SetExtension(double ex_len, double ex_ang);

		/// <summary>
		/// 길이 치수를 설정한다.
		/// </summary>
		/// <param name="pGeom">대상 오브젝트</param>
		/// <param name="offset">치수선 길이</param>
		void SetDimLength(std::shared_ptr<Geom> pGeom, cad_type offset);

		/// <summary>
		/// 각도 치수를 설정한다.
		/// </summary>
		/// <param name="pGeom">대상 오브젝트</param>
		/// <param name="offset">치수선 길이</param>
		void SetDimAngle(std::shared_ptr<Geom> pGeom, cad_type offset);

		/// <summary>
		/// 지름 치수를 설정한다.
		/// </summary>
		/// <param name="pGeom">대상 오브젝트</param>
		/// <param name="ex_length">치수 연장선 길이</param>
		/// <param name="ex_angle">치수 연장선 각도</param>
		void SetDimDiameter(std::shared_ptr<Geom> pGeom, cad_type ex_length, cad_type ex_angle);

		/// <summary>
		/// 반지름 치수를 설정한다.
		/// </summary>
		/// <param name="pGeom">대상 오브젝트</param>
		/// <param name="ex_length">치수 연장선 길이</param>
		/// <param name="ex_angle">치수 연장선 각도</param>
		void SetDimRadius(std::shared_ptr<Geom> pGeom, cad_type ex_length, cad_type ex_angle);

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
		/// 화살표 프리뷰를 생성한다
		/// </summary>
		/// <param name="preview">프리뷰가 저장될 변수</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		/// <param name="angle">각도</param>
		/// <param name="length">거리</param>
		void GeneratePreviewArrow(shared_ptr<Group> preview, double x, double y, double z, double angle, double length = 1);
		
		/// <summary>
		/// 반지름 프리뷰를 생성한다
		/// </summary>
		/// <param name="preview">프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		bool GeneratePreviewRadius(shared_ptr<Group> preview);

		/// <summary>
		/// 직경 프리뷰를 생성한다
		/// </summary>
		/// <param name="preview">프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		bool GeneratePreviewDiameter(shared_ptr<Group> preview);

		/// <summary>
		/// 길이 프리뷰를 생성한다
		/// </summary>
		/// <param name="preview">프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		bool GeneratePreviewLength(shared_ptr<Group> preview);

		/// <summary>
		/// 각도 프리뷰를 생성한다
		/// </summary>
		/// <param name="preview">프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		bool GeneratePreviewAngle(shared_ptr<Group> preview);

		/// <summary>
		/// 텍스트 프리뷰를 생성한다
		/// </summary>
		/// <param name="preview">프리뷰가 저장될 변수</param>
		/// <param name="msg">텍스트</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		/// <param name="angle">각도</param>
		/// <param name="align">align 모드</param>
		void GeneratePreviewText(shared_ptr<Group> preview, string msg, double x, double y, double z, double angle, int align = 0);

		/// <summary>
		/// 텍스트의 메시지를 설정한다
		/// </summary>
		/// <param name="msg">메시지 문자열</param>
		void SetMessage(string msg);

		/// <summary>
		/// 메시지를 반환한다
		/// </summary>
		/// <returns>메시지</returns>
		string GetMessage();

		/// <summary>
		/// 인덱스에 해당하는 좌표를 반환한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <returns>Vector3 좌표</returns>
		Vector3 GetPoint(int index);

		/// <summary>
		/// 메시지의 크기를 반환한다
		/// </summary>
		/// <returns>메시지 크기</returns>
		int GetMessageSize();

		/// <summary>
		/// Dim 타입을 반환한다
		/// </summary>
		/// <returns>Dim Type</returns>
		int GetDimType();

		/// <summary>
		/// 반지름을 반환한다
		/// </summary>
		/// <returns>반지름</returns>
		double GetRadius();

		/// <summary>
		/// offset을 반환한다
		/// </summary>
		/// <returns>offset</returns>
		double GetOffset();

		/// <summary>
		/// font width를 반환한다
		/// </summary>
		/// <returns>font width</returns>
		double GetFontWidth();

		/// <summary>
		/// font height를 반환한다
		/// </summary>
		/// <returns>font height</returns>
		double GetFontHeight();

		/// <summary>
		/// angle을 반환한다
		/// </summary>
		/// <returns>angle</returns>
		double GetAngle();

		/// <summary>
		/// ref type을 반환한다
		/// </summary>
		/// <returns>ref type</returns>
		int GetRefType();

		/// <summary>
		/// 인덱스에 해당하는 좌표를 설정한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void SetPoint(int index, double x, double y, double z);

		/// <summary>
		/// 메시지를 설정한다
		/// </summary>
		/// <param name="msg">메시지</param>
		void SetMsg(string msg);

		/// <summary>
		/// 반지름을 설정한다
		/// </summary>
		/// <param name="radius">반지름 값</param>
		void SetRadius(double radius);

		/// <summary>
		/// 폰트를 설정한다
		/// </summary>
		/// <param name="width">높이</param>
		/// <param name="height">너비</param>
		void SetFont(double width, double height);

		/// <summary>
		/// offset을 설정한다
		/// </summary>
		/// <param name="offset">offset</param>
		void SetOffset(cad_type offset);

		/// <summary>
		/// 각도를 설정한다
		/// </summary>
		/// <param name="angle">각도</param>
		void SetAngle(cad_type angle);

		/// <summary>
		/// ref type을 설정한다
		/// </summary>
		/// <param name="refType">ref type</param>
		void SetRefType(int refType);

		/// <summary>
		/// dim type을 설정한다
		/// </summary>
		/// <param name="dimType">dim type</param>
		void SetDimType(int dimType);
	};
}