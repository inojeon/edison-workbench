#pragma once

namespace RayCad
{
	/// <summary>
	/// 2D Spline Geometry 클래스
	/// </summary>
	class Spline : public PointList {
	public:

		/// <summary>
		/// 선분으로 이루어진 미리보기 정보를 담고 있는 변수
		/// </summary>
		shared_ptr<PLine> _preview;

		/// <summary>
		/// 
		/// </summary>
		double _tStart;

		/// <summary>
		/// 
		/// </summary>
		double _tEnd;

		/// <summary>
		/// 0: approximation curve : B Spline
		/// 1: interpolation curve
		/// </summary>
		int _spline_type; 

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Spline();

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
		/// 2차원 상의 점과 Spline 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <returns>점과 Spline 사이의 거리</returns>
		virtual double distance2(double x, double y);

		/// <summary>
		/// 3차원 상의 점과 Spline 사이의 거리를 구한다
		/// </summary>
		/// <param name="x">점의 x 좌표</param>
		/// <param name="y">점의 y 좌표</param>
		/// <param name="y">점의 z 좌표</param>
		/// <returns>점과 Spline 사이의 거리</returns>
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
		/// 객체의 렌더링 프리뷰 반환
		/// </summary>
		/// <returns>렌더링 프리뷰</returns>
		shared_ptr<PLine> CalcPreview();

		/// <summary>
		/// 프리뷰 렌더링을 할 오브젝트 생성
		/// </summary>
		/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);

		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>
		shared_ptr<PLine> CalcPreviewBS();

		/// <summary>
		/// 
		/// </summary>
		/// <param name="tlist"></param>
		/// <returns></returns>
		shared_ptr<PLine> CalcPreviewTK(vector<double>* tlist = NULL);


		/// <summary>
		/// 기하 오브젝트 피킹 시 가장 가까운 오브젝트를 찾기 위한 지점들을 구한다
		/// </summary>
		/// <param name="plist">AuxUIPoints를 저장할 변수</param>
		//virtual void GetAuxUIPoints(shared_ptr<PointList> plist);

		/// <summary>
		/// 바운딩 박스를 반환한다 (PLine과 동일하게 임시 구현)
		/// </summary>
		/// <returns>바운딩 박스</returns>
		virtual shared_ptr<BoundingBox2> GetBoundingBox2();

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
		/// 스플라인의 타입을 지정한다
		/// </summary>
		/// <param name="type">스플라인 타입</param>
		void SetSplineType(int type) {
			_spline_type = type;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="t1"></param>
		/// <param name="t2"></param>
		void SetStartEnd(double t1, double t2);
		
		/// <summary>
		/// 선분과 스플라인의 교차점을 구한다
		/// </summary>
		/// <param name="line">주어진 선분</param>
		/// <param name="list"></param>
		/// <param name="points">교차점을 저장할 위치</param>
		/// <returns>교차 여부</returns>
		bool GetIntersectLineSeg(shared_ptr<LineSeg> line, vector<double>& list, vector<double>& points);

	
		/// <summary>
		/// 주어진 바운딩 박스와의 교차여부 반환
		/// </summary>
		/// <param name="bbox2">비교할 바운딩 박스</param>
		/// <returns>교차 여부</returns>
		bool IsBoxIntersect(shared_ptr<BoundingBox2> bbox2);
	};
}
