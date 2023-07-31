#pragma once
namespace RayCad
{
	/// <summary>
	/// Sphere를 상속받는 Atom 클래스
	/// </summary>
	class Atom : public Sphere
	{
	public:

		/// <summary>
		/// atom id
		/// </summary>
		int _atomID;

		/// <summary>
		/// charge
		/// </summary>
		int _charge;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다.
		/// </summary>
		Atom();

		/// <summary>
		/// 구체의 중심 좌표를 설정
		/// </summary>
		/// <param name="x"></param>
		/// <param name="y"></param>
		/// <param name="z"></param>
		void Set(cad_type x, cad_type y, cad_type z);

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
		/// 메모리 블럭에 구에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">구의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);


		/// <summary>
		/// 구의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// Atom ID를 반환한다.
		/// </summary>
		/// <returns>Atom ID</returns>
		int GetAtomNumber();

		/// <summary>
		/// Atom ID를 설정한다.
		/// </summary>
		/// <param name="atom_number">Atom ID</param>
		void SetAtomNumber(int atom_number);

		/// <summary>
		/// Charge를 설정한다.
		/// </summary>
		/// <param name="charge">charge number</param>
		void SetCharge(int charge);

		/// <summary>
		/// Charge를 반환한다.
		/// </summary>
		/// <returns></returns>
		int GetCharge();

	};


}