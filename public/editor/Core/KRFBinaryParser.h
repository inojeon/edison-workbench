#pragma once


namespace RayCad
{
	/// <summary>
	/// KRF 바이너리 파서 클래스
	/// </summary>
	class KRFBinaryParser {
	public:
		/// <summary>
		/// 클래스 생성자
		/// </summary>
		KRFBinaryParser();

		/// <summary>
		/// 토큰 개수
		/// </summary>
		int _numOfTokens;
		/// <summary>
		/// Geom 객체를 의미하는 문자열 모음
		/// </summary>
		vector<vector<char*>> _tokens;
		/// <summary>
		/// 파싱된 geom 객체들
		/// </summary>
		vector<shared_ptr<Geom>> *_geoms;

		/// <summary>
		/// 토큰의 사이즈를 반환한다
		/// </summary>
		/// <returns>토큰 사이즈</returns>
		int GetLineCount();

		/// <summary>
		/// 청크 단위로 쪼개 token에 저장한다
		/// </summary>
		/// <param name="str_lines"></param>
		void ReadFromLines(string str_lines);

		/// <summary>
		/// 파일에 메모리 블록 내용물을 저장한다
		/// </summary>
		/// <param name="filename">저장할 파일 이름</param>
		/// <param name="block">바이너리 데이터가 포함된 메모리 블록</param>
		/// <returns></returns>
		bool WriteBinary(string filename, shared_ptr<MemoryBlock> block);
		
		/// <summary>
		/// 파일에 있는 바이너리를 메모리 블록으로 옮긴다
		/// </summary>
		/// <param name="filename">읽을 파일명</param>
		/// <param name="block">바이너리를 저장할 블록</param>
		/// <returns>성공 여부</returns>
		bool ReadBinary(string filename, shared_ptr<MemoryBlock> block);
		
		/// <summary>
		/// geom에 block에 있는 binary 내용물을 해석하여 추가한다
		/// </summary>
		/// <param name="block">geom 정보가 있는 binary 블록</param>
		/// <returns>성공 여부</returns>
		bool AddBinaryToGeom(shared_ptr<MemoryBlock> block);

		/// <summary>
		/// 커멘드 리스트를 반환한다
		/// </summary>
		/// <returns>커멘드 리스트</returns>
		shared_ptr<CommandList> GetCommandList();

		/// <summary>
		/// 기하 오브젝트들을 반환한다
		/// </summary>
		/// <returns>기하 오브젝트의 벡터</returns>
		vector<shared_ptr<Geom>>* GetGeoms();

		/// <summary>
		/// idx번째 있는 기하 오브젝트를 반환한다
		/// </summary>
		/// <param name="idx">인덱스</param>
		/// <returns>기하 오브젝트</returns>
		shared_ptr<Geom> GetGeom(int idx);
		
		/// <summary>
		/// 커멘드 리스트를 바이너리 블록으로 변환한다
		/// </summary>
		/// <param name="commandList">변환할 커멘드 리스트</param>
		/// <param name="data">변환된 커멘드 리스트를 저장할 변수</param>
		static void ParseCommandListToBinaryBlock(shared_ptr<CommandList> commandList, shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// 특정 라인의 토큰을 파싱한다 
		/// </summary>
		/// <param name="idx">인덱스</param>
		/// <returns>기하 오브젝트</returns>
		shared_ptr<Geom> ParseLine(int idx);
		
		/// <summary>
		/// 메모리 블록의 내용을 파싱한다
		/// </summary>
		/// <param name="block">기하 오브젝트 정보가 담긴 메모리 블록</param>
		/// <returns>기하 오브젝트</returns>
		static shared_ptr<Geom> ParseBlock(shared_ptr<MemoryBlock> block);

		/// <summary>
		/// point를 파싱한다
		/// </summary>
		/// <param name="data">point 바이너리 정보가 담긴 데이터</param>
		/// <returns>point</returns>
		static shared_ptr<Point> ParsePoint(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// atom을 파싱한다
		/// </summary>
		/// <param name="data">atom 바이너리 정보가 담긴 데이터</param>
		/// <returns>atom</returns>
		static shared_ptr<Atom> ParseAtom(shared_ptr<MemoryBlock> data);

		/// <summary>
		/// arc을 파싱한다
		/// </summary>
		/// <param name="data">arc 바이너리 정보가 담긴 데이터</param>
		/// <returns>arc</returns>
		static shared_ptr<Arc2> ParseArc(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// arc을 파싱한다
		/// </summary>
		/// <param name="data">arc 바이너리 정보가 담긴 데이터</param>
		/// <returns>arc</returns>
		static shared_ptr<Arc2> ParseArc2(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// bond를 파싱한다
		/// </summary>
		/// <param name="data">bond 바이너리 정보가 담긴 데이터</param>
		/// <returns>bond</returns>
		static shared_ptr<Bond> ParseBond(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// circle을 파싱한다
		/// </summary>
		/// <param name="data">circle 바이너리 정보가 담긴 데이터</param>
		/// <returns>circle</returns>
		static shared_ptr<Circle> ParseCircle(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// cylinder을 파싱한다
		/// </summary>
		/// <param name="data">cylinder 바이너리 정보가 담긴 데이터</param>
		/// <returns>cylinder</returns>
		static shared_ptr<Cylinder> ParseCylinder(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// geom을 파싱한다
		/// </summary>
		/// <param name="data">geom 바이너리 정보가 담긴 데이터</param>
		/// <returns>geom</returns>
		static shared_ptr<Geom> ParseGeom(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// group을 파싱한다
		/// </summary>
		/// <param name="data">group 바이너리 정보가 담긴 데이터</param>
		/// <returns>group</returns>
		static shared_ptr<Group> ParseGroup(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// endgroup을 파싱한다
		/// </summary>
		/// <param name="data">endgroup 바이너리 정보가 담긴 데이터</param>
		/// <returns>endgroup</returns>
		static shared_ptr<EndGroup> ParseEndGroup(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// lineseg을 파싱한다
		/// </summary>
		/// <param name="data">lineseg 바이너리 정보가 담긴 데이터</param>
		/// <returns>lineseg</returns>
		static shared_ptr<LineSeg> ParseLineSeg(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// mesh을 파싱한다
		/// </summary>
		/// <param name="data">mesh 바이너리 정보가 담긴 데이터</param>
		/// <returns>mesh</returns>
		static shared_ptr<Mesh> ParseMesh(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// material을 파싱한다
		/// </summary>
		/// <param name="data">material 바이너리 정보가 담긴 데이터</param>
		/// <returns>material</returns>
		static shared_ptr<Material> ParseMaterial(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// pointlist을 파싱한다
		/// </summary>
		/// <param name="data">pointlist 바이너리 정보가 담긴 데이터</param>
		/// <returns>pointlist</returns>
		static shared_ptr<PointList> ParsePointList(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// pline을 파싱한다
		/// </summary>
		/// <param name="data">pline 바이너리 정보가 담긴 데이터</param>
		/// <returns>pline</returns>
		static shared_ptr<PLine> ParsePLine(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// polygon을 파싱한다
		/// </summary>
		/// <param name="data">polygon 바이너리 정보가 담긴 데이터</param>
		/// <returns>polygon</returns>
		static shared_ptr<Polygon> ParsePolygon(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// sphere을 파싱한다
		/// </summary>
		/// <param name="data">sphere 바이너리 정보가 담긴 데이터</param>
		/// <returns>sphere</returns>
		static shared_ptr<Sphere> ParseSphere(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// spline을 파싱한다
		/// </summary>
		/// <param name="data">spline 바이너리 정보가 담긴 데이터</param>
		/// <returns>spline</returns>
		static shared_ptr<Spline> ParseSpline(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// protein trajectory를 파싱한다
		/// </summary>
		/// <param name="data">protein trajectory 바이너리 정보가 담긴 데이터</param>
		/// <returns>protein trajectory</returns>
		static shared_ptr<ProteinTrajectory> ParseProteinTrajectory(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// dim을 파싱한다
		/// </summary>
		/// <param name="data">바이너리 정보가 담긴 데이터</param>
		/// <returns>dim</returns>
		static shared_ptr<Dim> ParseDim(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// 
		/// </summary>
		/// <param name="data"></param>
		/// <returns></returns>
		static shared_ptr<ExtraData> ParseExtraData(shared_ptr<MemoryBlock> data);
		
		/// <summary>
		/// 메모리 블록의 데이터를 커멘드 리스트에 추가한다 
		/// </summary>
		/// <param name="block">geom 객체 정보가 담긴 메모리 블록</param>
		/// <param name="cmdlist">파싱한 객체 정보를 담을 커멘드 리스트</param>
		/// <returns>성공 여부</returns>
		static bool BinaryToGeom(shared_ptr<MemoryBlock> block, shared_ptr<CommandList> cmdlist);

		/// <summary>
		/// 로드 시 id에 더할 base id를 설정한다
		/// </summary>
		/// <param name="base_id">base id</param>
		static void SetBaseID4Load(int base_id);

		/// <summary>
		/// base id를 반환한다
		/// </summary>
		/// <returns>base id</returns>
		static int GetBaseID();

	protected:
		/// <summary>
		/// geom 객체를 바이너리로 변환하기 위한 커멘드 리스트
		/// </summary>
		shared_ptr<CommandList> _commandList;

		/// <summary>
		/// geom 객체의 base id
		/// </summary>
		static int _baseID;
	};
}