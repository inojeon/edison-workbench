#pragma once

namespace RayCad
{
	/// <summary>
	/// Protein Trajectory 클래스
	/// </summary>
	class ProteinTrajectory : public Geom
	{
	public:
		/// <summary>
		/// point 버퍼
		/// </summary>
		vector<cad_type> _points;
		
		/// <summary>
		/// normal 버퍼
		/// </summary>
		vector<cad_type> _normal;
		

		/// <summary>
		/// 아미노산 타입
		/// </summary>
		string _amino_type; // Coil:C ,Helix:H, Strand:S


		/// <summary>
		/// dna 여부
		/// </summary>
		bool _isDna;

		/// <summary>
		/// DNA Arm 정보
		/// </summary>
		vector<vector<int>> _dnaArm;


		/// <summary>
		/// 크기
		/// </summary>
		int _size;

		/// <summary>
		/// 클래스 생성자
		/// </summary>
		ProteinTrajectory();

		/// <summary>
		/// ProteinTrajectory를 초기화한다
		/// </summary>
		/// <param name="size">protein trajectory 사이즈</param>
		void Init(int size);

		/// <summary>
		/// 인덱스에 해당하는 point, normal, type을 설정한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <param name="pos">point</param>
		/// <param name="normal">normal</param>
		/// <param name="type">type</param>
		void Set(int index, Vector3 pos, Vector3 normal, int type);

		/// <summary>
		/// 인덱스에 해당하는 point를 설정한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <param name="x">x 좌표</param>
		/// <param name="y">y 좌표</param>
		/// <param name="z">z 좌표</param>
		void SetPoint(int index, cad_type x, cad_type y, cad_type z);

		/// <summary>
		/// 인덱스에 해당하는 normal을 설정한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <param name="x">x 방향</param>
		/// <param name="y">y 방향</param>
		/// <param name="z">z 방향</param>
		void SetNormal(int index, cad_type x, cad_type y, cad_type z);

		/// <summary>
		/// 인덱스에 해당하는 amino_type을 설정한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <param name="amino_type">아미노산 타입</param>
		void SetAminoType(int index, char amino_type);
		

		/// <summary>
		/// protein trajectory의 사이즈를 반환한다
		/// </summary>
		/// <returns>사이즈</returns>
		int GetNumPoints();

		/// <summary>
		/// 인덱스에 해당하는 point를 반환한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <returns>포인트</returns>
		Vector3 GetPos(int index);

		/// <summary>
		/// 인덱스에 해당하는 normal을 반환한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <returns>normal</returns>
		Vector3 GetNormal(int index);

		/// <summary>
		/// 인덱스에 해당하는 아미노산 타입을 반환한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <returns>아미노산 타입</returns>
		char GetAminoType(int index);

		/// <summary>
		/// 인덱스에 해당하는 타입이 아미노산인지 판별한다
		/// </summary>
		/// <param name="index">인덱스</param>
		/// <returns>아미노산 여부</returns>
		bool IsAminoacid(int index);

		/// <summary>
		/// protein trajectory를 복제하여 반환한다
		/// </summary>
		/// <returns>복제된 protein trajectory</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 타입명을 반환한다
		/// </summary>
		/// <returns>"ProteinTrajectory"</returns>
		virtual string GetTypeName();

		/// <summary>
		/// protein trajectory를 바이너리로 변환하여 메모리블록에 write한다
		/// </summary>
		/// <param name="data">메모리 블록</param>
		/// <param name="ptr">메모리 블록에 write할 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// protein trajectory의 바이너리 사이즈를 반환한다
		/// </summary>
		/// <param name="bIncludeTag">tag 포함 여부</param>
		/// <returns>protein trajectory의 바이너리 사이즈</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// dna arm을 설정한다
		/// </summary>
		/// <param name="idx">인덱스</param>
		/// <param name="arm">dna arm 정보</param>
		void SetDnaArm(int idx, vector<int> arm);

		/// <summary>
		/// 인덱스에 해당하는 dna arm 정보를 반환한다
		/// </summary>
		/// <param name="idx"></param>
		/// <returns></returns>
		std::vector<int> GetDnaArm(int idx);

		/// <summary>
		/// max arm의 갯수를 설정한다
		/// </summary>
		/// <param name="max_arm">max arm의 수</param>
		void SetMaxArms(int max_arm);

		/// <summary>
		/// dna 여부를 반환한다
		/// </summary>
		/// <returns>dna 여부</returns>
		bool IsDNA();



	};


}