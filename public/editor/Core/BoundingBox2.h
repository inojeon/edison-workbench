#pragma once

namespace RayCad
{
	/// <summary>
	/// 객체의 렌더링 공간을 정의하기 위한 클래스
	/// </summary>
	class BoundingBox2
	{
	public:
		/// <summary>
		/// 바운딩 박스 정의 여부
		/// </summary>
		bool _notDefined;
		/// <summary>
		/// 바운딩 박스의 좌측하단지점
		/// </summary>
		Vector3 _minCoord;
		/// <summary>
		/// 바운딩 박스의 우측상단지점
		/// </summary>
		Vector3 _maxCoord;
		
		/// <summary>
		/// 생성자
		/// </summary>
		BoundingBox2();
		virtual ~BoundingBox2();

		/// <summary>
		/// 바운딩 박스를 초기화한다
		/// </summary>
		void Reset();

		/// <summary>
		/// 바운딩 박스에 좌표를 추가한다
		/// </summary>
		/// <param name="x">추가할 x 좌표</param>
		/// <param name="y">추가할 y 좌표</param>
		/// <param name="z">추가할 z 좌표</param>
		void Add(cad_type x, cad_type y, cad_type z);

		/// <summary>
		/// 바운딩 박스에 또 다른 바운딩 박스를 추가한다
		/// </summary>
		/// <param name="bbox">합쳐진 바운딩 박스</param>
		void Add(shared_ptr<BoundingBox2> bbox);

		/// <summary>
		/// 바운딩 박스와의 교차 여부를 반환한다
		/// </summary>
		/// <param name="bbox">교차 여부를 확인할 대상 바운딩 박스</param>
		/// <returns>교차 여부</returns>
		bool IsIntersect(shared_ptr<BoundingBox2> bbox);

		/// <summary>
		/// 현재 바운딩 박스 객체를 복사한다
		/// </summary>
		/// <returns>복사된 객체에 대한 스마트 포인터</returns>
		shared_ptr<BoundingBox2> Clone();

		/// <summary>
		/// 주어진 변위만큼 바운딩 박스를 모든 방향으로 확장시킨다
		/// </summary>
		/// <param name="dx">확장할 x축 변위</param>
		/// <param name="dy">확장할 y축 변위</param>
		void Enlarge(double dx, double dy, double dz);

		/// <summary>
		/// 주어진 바운딩 박스를 현 바운딩 박스로 복사한다
		/// </summary>
		/// <param name="src">원본 바운딩 박스</param>
		void CopyFrom(shared_ptr<BoundingBox2> src);

		/// <summary>
		/// 주어진 바운딩 박스가 현 바운딩 박스 내에 포함되는지 확인한다
		/// </summary>
		/// <param name="bbox">포함 여부 확인 대상</param>
		/// <returns>포함 여부</returns>
		bool IsContain(shared_ptr<BoundingBox2> bbox);

		/// <summary>
		/// 바운딩 박스 객체 정보를 문자열로 변환
		/// </summary>
		/// <returns>바운딩 박스 좌표 정보가 들어있는 문자열</returns>
		string toString();
	};


}