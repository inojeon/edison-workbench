#pragma once

namespace RayCad
{
	/// <summary>
	/// Point List Geomtery 클래스
	/// </summary>
	class PointList : public Geom {
	public:
		/// <summary>
		/// 포인트 리스트의 점들
		/// </summary>
		vector<cad_type> _points;
		
		/// <summary>
		/// 렌더링 영역을 의미하는 바운딩 박스
		/// </summary>
		shared_ptr<BoundingBox2> _bbox2;
		
		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		PointList();
		
		/// <summary>
		/// 주어진 개수만큼의 점을 (0,0,0)으로 채워넣는다
		/// </summary>
		/// <param name="num_points">추가할 점의 개수</param>
		void Init(int num_points);
		
		/// <summary>
		/// 인덱스 위치의 좌표를 가져온다
		/// </summary>
		/// <param name="index"></param>
		/// <returns></returns>
		Vector3 GetPoint(int index);
		
		/// <summary>
		/// 인덱스 위치의 점 좌표를 지정한다
		/// </summary>
		/// <param name="index">지정할 점의 인덱스</param>
		/// <param name="x">갱신할 x 좌표</param>
		/// <param name="y">갱신할 y 좌표</param>
		/// <param name="z">갱신할 z 좌표</param>
		/// <returns></returns>
		bool SetPoint(int index, cad_type x, cad_type y, cad_type z);
		
		/// <summary>
		/// PointList 점의 개수를 반환
		/// </summary>
		/// <returns>점의 개수</returns>
		int GetNumberOfPoints();
		
		/// <summary>
		/// 기하 오브젝트와 점 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <returns>점과 기하 오브젝트 사이의 거리</returns>
		double distance2(double x, double y);

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
		/// 기하 오브젝트와 점 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <param name="z">점의 z 좌표</param>
		/// <returns>점과 기하 오브젝트 사이의 거리</returns>
		double distance3(double x, double y, double z);

		/// <summary>
		/// 새로운 점을 추가한다
		/// </summary>
		/// <param name="x">새로운 점의 x 좌표</param>
		/// <param name="y">새로운 점의 y 좌표</param>
		/// <param name="z">새로운 점의 z 좌표</param>
		/// <returns></returns>
		virtual int AddPoint(cad_type x, cad_type y, cad_type z);
		
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
		/// 메모리 블럭에 포인트 리스트에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">포인트 리스트의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);
		
		/// <summary>
		/// 포인트 리스트의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 프리뷰 렌더링 오브젝트 생성
		/// </summary>
		/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);
		
		/// <summary>
		/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 위한 지점들을 구한다
		/// </summary>
		/// <param name="plist">AuxUIPoints를 저장할 변수</param>
		virtual void GetAuxUIPoints(shared_ptr<PointList> plist);
		
		/// <summary>
		/// 객체의 영역을 나타내는 바운딩 박스를 반환한다
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
		/// pointlist의 정보를 문자열로 반환한다.
		/// </summary>
		/// <returns>pointlist 문자열 정보</returns>
		virtual string toString();
	};
}