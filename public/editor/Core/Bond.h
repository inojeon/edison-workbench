#pragma once
namespace RayCad
{
	/// <summary>
	/// Bond 클래스
	/// </summary>
	class Bond : public Geom
	{
	public:
		/// <summary>
		/// 첫번째 결합 원소 아이디
		/// </summary>
		int _atom1ID;

		/// <summary>
		/// 두번째 결합 원소 아이디
		/// </summary>
		int _atom2ID;

		/// <summary>
		/// 본드 타입
		/// </summary>
		int _bondType;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다.
		/// </summary>
		Bond();

		/// <summary>
		/// 실린더의 하부 중심점과 상부 중심점을 설정한다
		/// </summary>
		/// <param name="p1x">하부 중심점의 x 좌표</param>
		/// <param name="p1y">하부 중심점의 y 좌표</param>
		/// <param name="p1z">하부 중심점의 z 좌표</param>
		/// <param name="p2x">상부 중심점의 x 좌표</param>
		/// <param name="p2y">상부 중심점의 y 좌표</param>
		/// <param name="p2z">상부 중심점의 z 좌표</param>
		/// <param name="radius">실린더 반지름</param>
		//void Set(cad_type p1x, cad_type p1y, cad_type p1z, cad_type p2x, cad_type p2y, cad_type p2z);

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
		/// Bond Type을 반환한다
		/// </summary>
		/// <returns>Bond Type</returns>
		int GetBondType();

		/// <summary>
		/// Bond Type을 설정한다
		/// </summary>
		/// <param name="type">Bond Type</param>
		void SetBondType(int type);

		/// <summary>
		/// Bond의 Atom1 ID를 반환한다
		/// </summary>
		/// <returns>Atom1 ID</returns>
		int GetAtom1ID();

		/// <summary>
		/// Bond의 Atom1 ID를 설정한다
		/// </summary>
		/// <param name="id">Atom1 ID</param>
		void SetAtom1ID(int id);

		/// <summary>
		/// Bond의 Atom2 ID를 반환한다
		/// </summary>
		/// <returns>Atom2 ID</returns>
		int GetAtom2ID();

		/// <summary>
		/// Bond의 Atom2 ID를 설정한다
		/// </summary>
		/// <param name="id">Atom2 ID</param>
		void SetAtom2ID(int id);

	};


}