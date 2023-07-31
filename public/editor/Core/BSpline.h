#pragma once



namespace RayCad
{
	/// <summary>
	/// 'Spline' 타입의 preview를 그리기 위해 사용되는 클래스
	/// </summary>
	class BSpline {
	public:
		/// <summary>
		/// 
		/// </summary>
		int _type;
		/// <summary>
		/// 
		/// </summary>
		bool _ready;
		/// <summary>
		/// 컨트롤 포인트 1
		/// </summary>
		Vector3 _p1;
		/// <summary>
		/// 컨트롤 포인트 2
		/// </summary>
		Vector3 _p2;
		/// <summary>
		/// 컨트롤 포인트 3
		/// </summary>
		Vector3 _p3;
		/// <summary>
		/// 컨트롤 포인트 4
		/// </summary>
		Vector3 _p4;

		// tk spline용 데이터
		
		/// <summary>
		/// 
		/// </summary>
		std::vector<double> _tkt; // must be increasing
		/// <summary>
		/// 
		/// </summary>
		std::vector<double> _tkx;
		/// <summary>
		/// 
		/// </summary>
		std::vector<double> _tky;

		/// <summary>
		/// 
		/// </summary>
		tk::spline _tkspX;
		/// <summary>
		/// 
		/// </summary>
		tk::spline _tkspY;


		/// <summary>
		/// 모든 컨트롤 포인트가 0으로 초기화된 b-spline을 생성한다
		/// </summary>
		BSpline(); // 0: bspline, 1:tk curve

		/// <summary>
		/// 주어진 인자들을 바탕으로 b-spline의 컨트롤 포인트를 설정한다 
		/// </summary>
		/// <param name="p1">첫번째 컨트롤 포인트</param>
		/// <param name="p2">두번째 컨트롤 포인트</param>
		/// <param name="p3">세번째 컨트롤 포인트</param>
		/// <param name="p4">네번째 컨트롤 포인트</param>
		BSpline(int type, Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4);

		/// <summary>
		/// BSpline의 타입을 설정한다
		/// </summary>
		/// <param name="type">bspline type</param>
		void SetType(int type) {
			_type = type;
		}

		/// <summary>
		/// 컨트롤 포인트를 설정한다
		/// </summary>
		/// <param name="p1">첫번째 컨트롤 포인트</param>
		/// <param name="p2">두번째 컨트롤 포인트</param>
		/// <param name="p3">세번째 컨트롤 포인트</param>
		/// <param name="p4">네번째 컨트롤 포인트</param>
		void Set(Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4);

		/// <summary>
		/// BSpline의 좌표를 추가한다
		/// </summary>
		/// <param name="t">인덱스</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void AddPoint(int t, double x, double y, double z);

		/// <summary>
		/// 구간에 해당하는 곡선 위의 점을 반환한다
		/// </summary>
		/// <param name="t">구간의 특정 위치</param>
		/// <returns>곡선 위의 점</returns>
		Vector3 Get(double t);
		
		/// <summary>
		/// 
		/// </summary>
		/// <param name="t"></param>
		/// <returns></returns>
		Vector3 GetBS(double t);

		/// <summary>
		/// 
		/// </summary>
		/// <param name="t"></param>
		/// <returns></returns>
		Vector3 GetTK(double t);

		/// <summary>
		/// 
		/// </summary>
		void Calc();
	};

}
