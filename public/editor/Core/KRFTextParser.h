#pragma once

namespace RayCad
{
	class MemoryBlock;

	/// <summary>
	/// KRF 텍스트 파서 클래스
	/// </summary>
	class KRFTextParser
	{
	public:
		/// <summary>
		/// 클래스 생성자
		/// </summary>
		KRFTextParser();

		/// <summary>
		/// 문자열로부터 커멘드 리스트를 생성한다
		/// </summary>
		/// <param name="data">geom 객체 정보가 담긴 문자열</param>
		/// <param name="cmdlist">파싱한 결과를 담을 커멘드 리스트</param>
		static void TextToGeom(vector<vector<unsigned char*>>* data, shared_ptr<CommandList> cmdlist);

		/// <summary>
		/// geom 객체 정보를 파일로 저장한다
		/// </summary>
		/// <param name="filename">저장할 파일명</param>
		/// <param name="geoms">저장할 geom 벡터</param>
		/// <returns></returns>
		bool WriteText(string filename, vector<shared_ptr<Geom>>* geoms);
		
		/// <summary>
		/// 텍스트 파일을 변환하여 커멘드 리스트에 추가한다
		/// </summary>
		/// <param name="block">geom에 관한 정보가 들어있는 메모리 블록</param>
		/// <returns>성공 여부</returns>
		bool Load(shared_ptr<MemoryBlock> block);

		/// <summary>
		/// 커멘드 리스트를 반환한다
		/// </summary>
		/// <returns>커멘드 리스트</returns>
		shared_ptr<CommandList> GetCommandList();

		/// <summary>
		/// 현재 커멘드 리스트의 정보를 인자로 주어진 commands에 추가한다
		/// </summary>
		/// <param name="commands">데이터를 추가할 커멘드 리스트</param>
		void GetCommands(shared_ptr<CommandList> commands);

		/// <summary>
		/// 커멘드 리스트 내의 정보를 문자열로 변환한다
		/// </summary>
		/// <param name="commandList">변환할 커멘드 리스트</param>
		/// <returns>파싱된 문자열 벡터</returns>
		static vector<shared_ptr<string>>* CommandListToStringVector(shared_ptr<CommandList> commandList);

		/// <summary>
		/// 문자열로부터 Atom을 파싱한다.
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns></returns>
		static shared_ptr<Atom> TextToAtom(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Arc를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns></returns>
		static shared_ptr<Arc2> TextToArc(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Arc2를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Arc2</returns>
		static shared_ptr<Arc2> TextToArc2(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Bond를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Bond</returns>
		static shared_ptr<Bond> TextToBond(vector<unsigned char*>* data);
		
		/// <summary>
		/// 문자열로부터 Circle을 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Circle</returns>
		static shared_ptr<Circle> TextToCircle(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Cylinder를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Cylinder</returns>
		static shared_ptr<Cylinder> TextToCylinder(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Group을 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Group</returns>
		static shared_ptr<Group> TextToGroup(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 LineSeg를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>LineSeg</returns>
		static shared_ptr<LineSeg> TextToLineSeg(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Material을 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Material</returns>
		static shared_ptr<Material> TextToMaterial(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Mesh를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Mesh</returns>
		static shared_ptr<Mesh> TextToMesh(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 PLine을 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>PLine</returns>
		static shared_ptr<PLine> TextToPLine(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Point를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Point</returns>
		static shared_ptr<Point> TextToPoint(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns></returns>
		static shared_ptr<PointList> TextToPointList(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Polygon을 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Polygon</returns>
		static shared_ptr<Polygon> TextToPolygon(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Sphere를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Sphere</returns>
		static shared_ptr<Sphere> TextToSphere(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 Spline을 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>Spline</returns>
		static shared_ptr<Spline> TextToSpline(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 ProteinTrajectory를 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>ProteinTrajectory</returns>
		static shared_ptr<ProteinTrajectory> TextToProteinTrajectory(vector<unsigned char*>* data);

		/// <summary>
		/// 문자열로부터 EndGroup을 파싱한다
		/// </summary>
		/// <param name="data">기하 오브젝트 정보가 들어있는 문자열 벡터</param>
		/// <returns>EndGroup</returns>
		static shared_ptr<EndGroup> TextToEndGroup(vector<unsigned char*>* data);

		/// <summary>
		/// 
		/// </summary>
		/// <param name="data"></param>
		/// <returns></returns>
		static shared_ptr<ExtraData> TextToExtraData(vector<unsigned char*>* data);

		/// <summary>
		/// Geom 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Geom 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string GeomToText(shared_ptr<Geom> geom);

		/// <summary>
		/// Atom 객체로부터 문자열을 파싱한다.
		/// </summary>
		/// <param name="geom">파싱할 Atom 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string AtomToText(shared_ptr<Atom> geom);

		/// <summary>
		/// Arc 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Arc 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string ArcToText(shared_ptr<Arc> geom);
		/// <summary>
		/// Arc2 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Arc2 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string Arc2ToText(shared_ptr<Arc2> geom);
		/// <summary>
		/// Bond 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Bond 객체</param>
		/// <returns>파싱할 문자열</returns>
		static string BondToText(shared_ptr<Bond> geom);
		/// <summary>
		/// Circle 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Circle 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string CircleToText(shared_ptr<Circle> geom);
		/// <summary>
		/// Cylinder 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Cylinder 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string CylinderToText(shared_ptr<Cylinder> geom);
		/// <summary>
		/// Group 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Group 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string GroupToText(shared_ptr<Group> geom);
		/// <summary>
		/// EndGroup 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 EndGroup 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string EndGroupToText(shared_ptr<EndGroup> geom);
		/// <summary>
		/// LineSeg 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 LineSeg 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string LineSegToText(shared_ptr<LineSeg> geom);
		/// <summary>
		/// Material 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Material 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string MaterialToText(shared_ptr<Material> geom);
		/// <summary>
		/// Mesh 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Mesh 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string MeshToText(shared_ptr<Mesh> geom);
		/// <summary>
		/// PLine 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 PLine 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string PLineToText(shared_ptr<PLine> geom);
		/// <summary>
		/// Point 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Point 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string PointToText(shared_ptr<Point> geom);
		/// <summary>
		/// PointList 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 PointList 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string PointListToText(shared_ptr<PointList> geom);
		/// <summary>
		/// Polygon 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Polygon 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string PolygonToText(shared_ptr<Polygon> geom);
		/// <summary>
		/// Sphere 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Sphere 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string SphereToText(shared_ptr<Sphere> geom);
		/// <summary>
		/// Spline 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 Spline 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string SplineToText(shared_ptr<Spline> geom);
		/// <summary>
		/// ProteinTrajectory 객체로 부터 문자열을 파싱한다
		/// </summary>
		/// <param name="geom">파싱할 ProteinTrajectory 객체</param>
		/// <returns>파싱한 문자열</returns>
		static string ProteinTrajectoryToText(shared_ptr<ProteinTrajectory> geom);

		/// <summary>
		/// 
		/// </summary>
		/// <param name="geom"></param>
		/// <returns></returns>
		static string ExtraDataToText(shared_ptr<ExtraData> geom);

		/// <summary>
		/// 로드 시 id에 더할 base id를 설정한다
		/// </summary>
		/// <param name="base_id">base id</param>
		static void SetBaseID4Load(int base_id);

		/// <summary>
		/// KRF 데이터 내에 Tag가 포함되었는지 판별한다
		/// </summary>
		/// <param name="data">Geom 중 Tag를 나타내는 위치의 문자열</param>
		/// <returns>Tag 존재 여부</returns>
		static bool IsIncludeTag(unsigned char* data);

		/// <summary>
		/// KRF 데이터 내에 UCS 좌표계가 포함되었는지 판별한다
		/// </summary>
		/// <param name="data">Geom을 의미하는 문자열 벡터</param>
		/// <param name="geomType">data의 타입</param>
		/// <returns>UCS 존재 여부</returns>
		static bool IsIncludeUCS(vector<unsigned char*>* data, int geomType);

		/// <summary>
		/// base id를 반환한다
		/// </summary>
		/// <returns>base id</returns>
		static int GetBaseID();

	protected:
		/// <summary>
		/// 문자열로 변환하는데 사용되는 커멘드 리스트
		/// </summary>
		shared_ptr<CommandList> _commandList;

		/// <summary>
		/// geom 객체에 부여할 base id
		/// </summary>
		static int _baseID;
	};
}