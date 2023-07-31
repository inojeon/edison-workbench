#pragma once

namespace RayCad
{
	/// <summary>
	/// Point Geometry 클래스
	/// </summary>
	class Point : public Geom {
	public:
		/// <summary>
		/// x 좌표
		/// </summary>
		double _x;
		/// <summary>
		/// y 좌표
		/// </summary>
		double _y;
		/// <summary>
		/// z 좌표
		/// </summary>
		double _z;

		/// <summary>
		/// 렌더링 영역을 나타내는 바운딩 박스
		/// </summary>
		shared_ptr<BoundingBox2> _bbox2;
		
		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Point();

		/// <summary>
		/// Point의 x,y,z 좌표 설정
		/// </summary>
		/// <param name="x"></param>
		/// <param name="y"></param>
		/// <param name="z"></param>
		void Set(double x, double y, double z);
		
		/// <summary>
		/// Point의 x,y,z 좌표 설정
		/// </summary>
		/// <param name="pos">좌표 정보가 담겨있는 인자</param>
		void Set(Vector3 pos);
		
		/// <summary>
		/// 좌표의 x 값 반환
		/// </summary>
		/// <returns>x</returns>
		double GetX();
		/// <summary>
		/// 좌표의 y 값 반환
		/// </summary>
		/// <returns>y</returns>
		double GetY();
		/// <summary>
		/// 좌표의 z 값 반환
		/// </summary>
		/// <returns>z</returns>
		double GetZ();


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
		/// 메모리 블럭에 점에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">점의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);
		
		/// <summary>
		/// 점의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);
		
		/// <summary>
		/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 위한 지점들을 구한다
		/// </summary>
		/// <param name="plist"></param>
		virtual void GetAuxUIPoints(shared_ptr <PointList> plist);
		
		/// <summary>
		/// 프리뷰 렌더링 오브젝트 생성
		/// </summary>
		/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);
		
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
		/// 주어진 매트릭스를 기준으로 변환 과정을 수행한다
		/// </summary>
		/// <param name="mat">변환에 사용될 매트릭스</param>
		virtual void Transform(shared_ptr<Matrix4> mat);
	};
}