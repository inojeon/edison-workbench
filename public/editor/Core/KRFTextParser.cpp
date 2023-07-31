#include "pch.h"

namespace RayCad
{
	const static int typeNum = 20;
	const static string typeNames[typeNum] = { "Point", "LineSeg", "PLine", "Polygon", "Circle", "", "Group", "Sphere", "Cylinder", "Mesh", "Material", "Spline", "EndGroup", "PointList", "ProteinTrajectory", "Arc", "", "Atom", "Bond"};

	int KRFTextParser::_baseID = 0;

	void RayCad::KRFTextParser::TextToGeom(vector<vector<unsigned char*>>* data, shared_ptr<CommandList> cmdlist)
	{

		int geom_type;
		size_t chunkSize = 0;

		for (int i = 0; i < data->size(); i++) {
			geom_type = -1;
			chunkSize = strlen((const char*)data->at(i).at(0));

			if (chunkSize <= 0)
				continue;

			if (strncmp((const char*)data->at(i).at(0), "ExtraData", 9) == 0) {
				geom_type = 1000;
			}
			if (geom_type < 0) {
				for (int j = 0; j < typeNum; j++) {
					if (typeNames[j].size() != chunkSize)
						continue;

					if (!strncmp(typeNames[j].c_str(), (const char*)data->at(i).at(0), typeNames[j].size())) {
						geom_type = j;
						break;
					}
				}
			}

			if (geom_type < 0)
				continue;

			shared_ptr<Geom> geom = NULL;
			switch (geom_type)
			{

			case Geom::G_ATOM:
				geom = TextToAtom(&(data->at(i)));
				break;

			case Geom::G_ARC:
				geom = TextToArc(&(data->at(i)));
				break;

			case Geom::G_ARC2:
				geom = TextToArc2(&(data->at(i)));
				break;

			case Geom::G_BOND:
				geom = TextToBond(&(data->at(i)));
				break;

			case Geom::G_CIRCLE:
				geom = TextToCircle(&(data->at(i)));
				break;

			case Geom::G_CYLINDER:
				geom = TextToCylinder(&(data->at(i)));
				break;

			case Geom::G_GROUP:
				geom = TextToGroup(&(data->at(i)));
				break;

			case Geom::G_ENDGROUP:
				geom = TextToEndGroup(&(data->at(i)));
				break;

			case Geom::G_LINE:
				geom = TextToLineSeg(&(data->at(i)));
				break;

			case Geom::G_MATERIAL:
				geom = TextToMaterial(&(data->at(i)));
				break;

			case Geom::G_MESH:
				geom = TextToMesh(&(data->at(i)));
				break;

			case Geom::G_PLINE:
				geom = TextToPLine(&(data->at(i)));
				break;

			case Geom::G_POINT:
				geom = TextToPoint(&(data->at(i)));
				break;

			case Geom::G_POINTLIST:
				geom = TextToPointList(&(data->at(i)));
				break;

			case Geom::G_POLYGON:
				geom = TextToPolygon(&(data->at(i)));
				break;

			case Geom::G_SPHERE:
				geom = TextToSphere(&(data->at(i)));
				break;

			case Geom::G_SPLINE:
				geom = TextToSpline(&(data->at(i)));
				break;

			case Geom::G_PROTEIN_TRAJECTORY:
				geom = TextToProteinTrajectory(&(data->at(i)));
				break;

			case Geom::G_EXTRADATA:
				geom = TextToExtraData(&(data->at(i)));
				break;

			
			}

			cmdlist->AddCommand(geom);

		}
	}

	KRFTextParser::KRFTextParser() {
		_commandList = make_shared<CommandList>();
	}

	string RayCad::KRFTextParser::GeomToText(shared_ptr<Geom> geom)
	{
		int geom_type = geom->GetType();
		string ret;
		switch (geom_type)
		{
		case Geom::G_ATOM:
			ret = AtomToText(dynamic_pointer_cast<Atom>(geom));
			break;

		case Geom::G_ARC:
			ret = ArcToText(dynamic_pointer_cast<Arc>(geom));
			break;

		case Geom::G_ARC2:
			ret = Arc2ToText(dynamic_pointer_cast<Arc2>(geom));
			break;

		case Geom::G_BOND:
			ret = BondToText(dynamic_pointer_cast<Bond>(geom));
			break;

		case Geom::G_CIRCLE:
			ret = CircleToText(dynamic_pointer_cast<Circle>(geom));
			break;

		case Geom::G_CYLINDER:
			ret = CylinderToText(dynamic_pointer_cast<Cylinder>(geom));
			break;

		case Geom::G_GROUP:
			ret = GroupToText(dynamic_pointer_cast<Group>(geom));
			break;

		case Geom::G_ENDGROUP:
			ret = EndGroupToText(dynamic_pointer_cast<EndGroup>(geom));
			break;

		case Geom::G_LINE:
			ret = LineSegToText(dynamic_pointer_cast<LineSeg>(geom));
			break;

		case Geom::G_MATERIAL:
			ret = MaterialToText(dynamic_pointer_cast<Material>(geom));
			break;

		case Geom::G_MESH:
			ret = MeshToText(dynamic_pointer_cast<Mesh>(geom));
			break;

		case Geom::G_PLINE:
			ret = PLineToText(dynamic_pointer_cast<PLine>(geom));
			break;

		case Geom::G_POINT:
			ret = PointToText(dynamic_pointer_cast<Point>(geom));
			break;

		case Geom::G_POINTLIST:
			ret = PointListToText(dynamic_pointer_cast<PointList>(geom));
			break;

		case Geom::G_POLYGON:
			ret = PolygonToText(dynamic_pointer_cast<Polygon>(geom));
			break;

		case Geom::G_SPHERE:
			ret = SphereToText(dynamic_pointer_cast<Sphere>(geom));
			break;

		case Geom::G_SPLINE:
			ret = SplineToText(dynamic_pointer_cast<Spline>(geom));
			break;

		case Geom::G_PROTEIN_TRAJECTORY:
			ret = ProteinTrajectoryToText(dynamic_pointer_cast<ProteinTrajectory>(geom));
			break;

		case Geom::G_EXTRADATA:
			ret = ExtraDataToText(dynamic_pointer_cast<ExtraData>(geom));
			break;
		}

		return ret;
	}

	string KRFTextParser::AtomToText(shared_ptr<Atom> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->_center._x);
		ret += "," + to_string(geom->_center._y);
		ret += "," + to_string(geom->_center._z);
		ret += "," + to_string(geom->_radius);
		ret += "," + to_string(geom->_atomID);
		ret += "," + to_string(geom->_charge);
		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}


	bool KRFTextParser::WriteText(string filename, vector<shared_ptr<Geom>>* geoms)
	{
		string fileContent = "";

		for (int i = 0; i < geoms->size(); i++) {
			cout << geoms->at(i)->GetTypeName() << endl;
			switch (geoms->at(i)->GetType())
			{
			case Geom::G_ATOM:
				fileContent += AtomToText(dynamic_pointer_cast<Atom>(geoms->at(i)));
				break;

			case Geom::G_ARC:
				fileContent += ArcToText(dynamic_pointer_cast<Arc>(geoms->at(i)));
				break;

			case Geom::G_ARC2:
				fileContent += Arc2ToText(dynamic_pointer_cast<Arc2>(geoms->at(i)));
				break;

			case Geom::G_CIRCLE:
				fileContent += CircleToText(dynamic_pointer_cast<Circle>(geoms->at(i)));
				break;

			case Geom::G_CYLINDER:
				fileContent += CylinderToText(dynamic_pointer_cast<Cylinder>(geoms->at(i)));
				break;

			case Geom::G_GROUP:
				fileContent += GroupToText(dynamic_pointer_cast<Group>(geoms->at(i)));
				break;

			case Geom::G_LINE:
				fileContent += LineSegToText(dynamic_pointer_cast<LineSeg>(geoms->at(i)));
				break;

			case Geom::G_MATERIAL:
				fileContent += MaterialToText(dynamic_pointer_cast<Material>(geoms->at(i)));
				break;

			case Geom::G_MESH:
				fileContent += MeshToText(dynamic_pointer_cast<Mesh>(geoms->at(i)));
				break;

			case Geom::G_PLINE:
				fileContent += PLineToText(dynamic_pointer_cast<PLine>(geoms->at(i)));
				break;

			case Geom::G_POINTLIST:
				fileContent += PointListToText(dynamic_pointer_cast<PointList>(geoms->at(i)));
				break;

			case Geom::G_POINT:
				fileContent += PointToText(dynamic_pointer_cast<Point>(geoms->at(i)));
				break;

			case Geom::G_POLYGON:
				fileContent += PolygonToText(dynamic_pointer_cast<Polygon>(geoms->at(i)));
				break;

			case Geom::G_SPHERE:
				fileContent += SphereToText(dynamic_pointer_cast<Sphere>(geoms->at(i)));
				break;

			case Geom::G_SPLINE:
				fileContent += SplineToText(dynamic_pointer_cast<Spline>(geoms->at(i)));
				break;

			case Geom::G_PROTEIN_TRAJECTORY:
				fileContent += ProteinTrajectoryToText(dynamic_pointer_cast<ProteinTrajectory>(geoms->at(i)));
				break;

			case Geom::G_ENDGROUP:
				fileContent += EndGroupToText(dynamic_pointer_cast<EndGroup>(geoms->at(i)));
				break;
			}
			fileContent += "\n";
		}

		FILE* fp = fopen(filename.c_str(), "wt");
		if (fp)
		{
			fwrite(&(fileContent[0]), fileContent.size(), 1, fp);
			fclose(fp);
		}
		return true;
	}



	bool KRFTextParser::Load(shared_ptr<MemoryBlock> block) {
		auto scan = Util::SplitStrings(block, ',');
		TextToGeom(scan, _commandList);
		return true;
	}


	vector<shared_ptr<string>>* KRFTextParser::CommandListToStringVector(shared_ptr<CommandList> commandList)
	{
		vector<shared_ptr<string>>* res = new vector<shared_ptr<string>>();
		int iter = commandList->GetNumberOfCommands();
		for (int i = 0; i < iter; i++)
		{
			// 그룹인 경우 Group과 함께 Group 내의 list 원소를 추가
			if (commandList->GetCommand(i)->GetType() == Geom::G_GROUP) {
				string groupCommand = GeomToText(commandList->GetCommand(i));
				res->push_back(make_shared<string>(groupCommand));

				auto group = dynamic_pointer_cast<Group>(commandList->GetCommand(i));
				int listSize = group->_list.size();
				for (int j = 0; j < listSize; j++)
				{
					string listGeomCommand = GeomToText(group->_list.at(j));
					res->push_back(make_shared<string>(listGeomCommand));
				}

				string endgroupCommand = GeomToText(commandList->GetCommand(i));
				endgroupCommand = "End" + endgroupCommand;
				res->push_back(make_shared<string>(endgroupCommand));
			}
			else {
				string currentCommand = GeomToText(commandList->GetCommand(i));
				res->push_back(make_shared<string>(currentCommand));
			}
		}
		return res;
	}

	shared_ptr<Atom> KRFTextParser::TextToAtom(vector<unsigned char*>* data)
	{
		double args[3] = { 0, };
		shared_ptr<Atom> atom = make_shared<Atom>();

#ifdef _DEBUG
		if (data->size() > 1 && data->at(1) != NULL)
#endif
			atom->SetID(atoi((const char*)data->at(1)));
		if (atom->_id >= 0)
			atom->_id += _baseID;

		for (int i = 0; i < 3; i++)
		{
#ifdef _DEBUG
			if (data->size() > i+2 && data->at(i + 2) != NULL)
#endif
				args[i] = atof((const char*)data->at(i + 2));
		}

		atom->Set(args[0], args[1], args[2]);

		if (data->size() > 5 && data->at(5) != NULL) {
			int atomID = atoi((const char*)data->at(5));
			atom->SetAtomNumber(atomID);
		}

		if (data->size() > 6 && data->at(6) != NULL) {
			string str((char*)data->at(6));
			if (str.find("=") != string::npos) {
				atom->SetTag(str);
				return atom;
			}
			else {
				int charge = atoi((const char*)data->at(6));
				atom->SetCharge(charge);
			}
		}

		// 태그 로드 추가. 마지막 parameter
		if (data->size() > 7 && data->at(7) != NULL) {
			string str((char*)data->at(7));
			atom->SetTag(str);
		}

		return atom;
	}

	shared_ptr<Arc2> KRFTextParser::TextToArc(vector<unsigned char*>* data)
	{
		double args[9] = { 0, };
		shared_ptr<Arc2> arc = make_shared<Arc2>();
#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			arc->SetID(atoi((const char*)data->at(1)));
		if (arc->_id >= 0)
			arc->_id += _baseID;

		for (int i = 0; i < 9; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				args[i] = atof((const char*)data->at(i + 2));
		}

		double r_st = (args[4] / 180.0) * ((double)M_PI);
		double sx = cos(r_st) * args[3] + args[0];
		double sy = sin(r_st) * args[3] + args[1];
		double sz = 0;

		double r_ed = (args[5] / 180.0) * ((double)M_PI);
		double ex = cos(r_ed) * args[3] + args[0];
		double ey = sin(r_ed) * args[3] + args[1];
		double ez = 0;
 
		arc->Set(args[0], args[1], args[2], args[3], sx, sy, sz, ex, ey, ez);
		arc->SetNormal(args[6], args[7], args[8]);

		if (data->at(9) != NULL) {
			string str((char*)data->at(9));
			arc->SetTag(str);
		}

		return arc;
	}

	shared_ptr<Arc2> KRFTextParser::TextToArc2(vector<unsigned char*>* data)
	{
		double args[13] = { 0, };
		bool bIncludeTag = false;

		shared_ptr<Arc2> arc = make_shared<Arc2>();
#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			arc->SetID(atoi((const char*)data->at(1)));

		if (arc->_id >= 0)
			arc->_id += _baseID;

		for (int i = 0; i < 13; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				args[i] = atof((const char*)data->at(i + 2));
		}

		arc->Set(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
		arc->SetNormal(args[10], args[11], args[12]);

		if (data->size() > 13)
			bIncludeTag = IsIncludeTag(data->at(13));
		if (bIncludeTag) {
			string str((char*)data->at(13));
			arc->SetTag(str);
		}

		if (IsIncludeUCS(data, Geom::G_ARC2)) {
			double ucsArgs[9] = { 0, };

			int idx;
			if (bIncludeTag)
				idx = 14;
			else
				idx = 13;

		}

		return arc;
	}

	shared_ptr<Bond> KRFTextParser::TextToBond(vector<unsigned char*>* data)
	{
		bool bIncludeTag = false;
		shared_ptr<Bond> bond = make_shared<Bond>();
#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			bond->SetID(atoi((const char*)data->at(1)));
		if (bond->_id >= 0)
			bond->_id += _baseID;


		//bond->Set(args[0], args[1], args[2], args[3], args[4], args[5]);
		
		int atom1ID = atoi((const char*)data->at(2));
		int atom2ID = atoi((const char*)data->at(3));

		bond->SetAtom1ID(atom1ID);
		bond->SetAtom2ID(atom2ID);
		bond->SetBondType(atoi((const char*)data->at(4)));
		
		if (data->size() > 5)
			bIncludeTag = IsIncludeTag(data->at(5));
		if (bIncludeTag) {
			string str((char*)data->at(5));
			bond->SetTag(str);
		}
		return bond;
	}


	shared_ptr<Circle> KRFTextParser::TextToCircle(vector<unsigned char*>* data)
	{
		double args[7] = { 0, };
		bool bIncludeTag = false;

		shared_ptr<Circle> circle = make_shared<Circle>();
#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			circle->SetID(atoi((const char*)data->at(1)));
		if (circle->_id >= 0)
			circle->_id += _baseID;

		for (int i = 0; i < 7; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				args[i] = atof((const char*)data->at(i + 2));
		}
		circle->Set(args[0], args[1], args[2], args[3]);
		circle->SetNormal(args[4], args[5], args[6]);

		if (data->size() > 7)
			bIncludeTag = IsIncludeTag(data->at(7));
		if (bIncludeTag) {
			string str((char*)data->at(7));
			circle->SetTag(str);
		}

		if (IsIncludeUCS(data, Geom::G_CIRCLE)) {
			double ucsArgs[9] = { 0, };

			int idx;
			if (bIncludeTag)
				idx = 8;
			else
				idx = 7;

		}

		return circle;
	}

	shared_ptr<Cylinder> KRFTextParser::TextToCylinder(vector<unsigned char*>* data)
	{
		double args[7] = { 0, };
		bool bIncludeTag = false;
		shared_ptr<Cylinder> cylinder = make_shared<Cylinder>();
#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			cylinder->SetID(atoi((const char*)data->at(1)));
		if (cylinder->_id >= 0)
			cylinder->_id += _baseID;

		for (int i = 0; i < 7; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				args[i] = atof((const char*)data->at(i + 2));
		}

		cylinder->Set(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);

		if (data->size() > 9)
			bIncludeTag = IsIncludeTag(data->at(9));
		if (bIncludeTag) {
			string str((char*)data->at(9));
			cylinder->SetTag(str);
		}
		return cylinder;
	}

	shared_ptr<Group> KRFTextParser::TextToGroup(vector<unsigned char*>* data)
	{
		shared_ptr<Group> group = make_shared<Group>();
#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			group->SetID(atoi((const char*)data->at(1)));
		if (group->_id >= 0)
			group->_id += _baseID;

		if (data->size() > 2) {
			string str((char*)data->at(2));
			group->SetTag(str);
		}
		return group;
	}

	shared_ptr<LineSeg> KRFTextParser::TextToLineSeg(vector<unsigned char*>* data)
	{
		double args[6] = { 0, };
		bool bIncludeTag = false;

		shared_ptr<LineSeg> lineSeg = make_shared<LineSeg>();

#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			lineSeg->SetID(atoi((const char*)data->at(1)));

		if (lineSeg->_id >= 0)
			lineSeg->_id += _baseID;

		for (int i = 0; i < 6; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				args[i] = atof((const char*)data->at(i + 2));
		}

		lineSeg->Set(args[0], args[1], args[2], args[3], args[4], args[5]);

		if (data->size() > 6)
			bIncludeTag = IsIncludeTag(data->at(6));
		if (bIncludeTag) {
			string str((char*)data->at(6));
			lineSeg->SetTag(str);
		}

		if (IsIncludeUCS(data, Geom::G_LINE)) {
			double ucsArgs[9] = { 0, };

			int idx;
			if (bIncludeTag)
				idx = 7;
			else
				idx = 6;

		}
		return lineSeg;
	}

	shared_ptr<Material> KRFTextParser::TextToMaterial(vector<unsigned char*>* data)
	{
		shared_ptr<Material> material = make_shared<Material>();

#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			material->SetID(atoi((const char*)data->at(1)));

		if (material->_id >= 0)
			material->_id += _baseID;

		if (data->size() > 2) {
			string str((char*)data->at(2));
			material->SetTag(str);
		}
		return material;
	}

	shared_ptr<Mesh> KRFTextParser::TextToMesh(vector<unsigned char*>* data)
	{
		int num_info[3] = { 0, }, tri[3] = { 0, };
		double vertex[3] = { 0, }, uv[2] = { 0, };

		shared_ptr<Mesh> mesh = make_shared<Mesh>();
#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			mesh->SetID(atoi((const char*)data->at(1)));

		if (mesh->_id >= 0)
			mesh->_id += _baseID;

		for (int i = 0; i < 3; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				num_info[i] = atoi((const char*)data->at(i + 2));
		}

		mesh->Init(num_info[0], num_info[2]);
		if (num_info[1] > 0)
			mesh->CreateUV();

		for (int i = 0; i < num_info[0]; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + j + 5) != NULL)
#endif
					vertex[j] = atof((const char*)data->at(i * 3 + j + 5));
			}
			mesh->SetVertex(i, vertex[0], vertex[1], vertex[2]);
		}

		for (int i = 0; i < num_info[1]; i++)
		{
			for (int j = 0; j < 2; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 2 + j + 5 + num_info[0] * 3) != NULL)
#endif
					uv[j] = atof((const char*)data->at(i * 2 + j + 5 + num_info[0] * 3));
			}
			mesh->SetUV(i, uv[0], uv[1]);
		}

		for (int i = 0; i < num_info[2]; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + j + 5 + num_info[0] * 3 + num_info[1] * 2) != NULL)
#endif
					tri[j] = atoi((const char*)data->at(i * 3 + j + 5 + num_info[0] * 3 + num_info[1] * 2));
			}
			mesh->SetTri(i, tri[0], tri[1], tri[2]);
		}

		if (data->size() > num_info[0] * 3 + num_info[1] * 2 + num_info[2] * 3 + 5) {
			string str((char*)data->at(num_info[0] * 3 + num_info[1] * 2 + num_info[2] * 3 + 5));
			mesh->SetTag(str);
		}
		return mesh;
	}


	shared_ptr<PLine> KRFTextParser::TextToPLine(vector<unsigned char*>* data)
	{
		double point[3] = { 0, };
		bool bIncludeTag = false;
		int numOfPoints = 0;
		shared_ptr<PLine> pline = make_shared<PLine>();

#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			pline->SetID(atoi((const char*)data->at(1)));
		if (pline->_id >= 0)
			pline->_id += _baseID;

#ifdef _DEBUG
		if (data->at(2) != NULL)
#endif
			numOfPoints = atoi((const char*)data->at(2));


		pline->Init(numOfPoints);
		for (int i = 0; i < numOfPoints; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + j + 3) != NULL)
#endif
					point[j] = atof((const char*)data->at(i * 3 + j + 3));
			}
			pline->SetPoint(i, point[0], point[1], point[2]);
		}

		if (data->size() > numOfPoints * 3 + 3)
			bIncludeTag = IsIncludeTag(data->at(numOfPoints * 3 + 3));
		if (bIncludeTag) {
			string str((char*)data->at(numOfPoints * 3 + 3));
			pline->SetTag(str);
		}

		if (IsIncludeUCS(data, Geom::G_PLINE)) {
			double ucsArgs[9] = { 0, };

			int idx;
			if (bIncludeTag)
				idx = numOfPoints * 3 + 4;
			else
				idx = numOfPoints * 3 + 3;

		}
		return pline;
	}

	shared_ptr<Point> KRFTextParser::TextToPoint(vector<unsigned char*>* data)
	{
		double p[3] = { 0, };
		bool bIncludeTag = false;
		shared_ptr<Point> point = make_shared<Point>();
#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			point->SetID(atoi((const char*)data->at(1)));
		if (point->_id >= 0)
			point->_id += _baseID;

		for (int i = 0; i < 3; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				p[i] = atof((const char*)data->at(i + 2));
		}
		point->Set(p[0], p[1], p[2]);

		if (data->size() > 5)
			bIncludeTag = IsIncludeTag(data->at(5));
		if (bIncludeTag) {
			string str((char*)data->at(5));
			point->SetTag(str);
		}

		if (IsIncludeUCS(data, Geom::G_POINT)) {
			double ucsArgs[9] = { 0, };

			int idx;
			if (bIncludeTag)
				idx = 6;
			else
				idx = 5;

		}

		return point;
	}

	shared_ptr<PointList> KRFTextParser::TextToPointList(vector<unsigned char*>* data)
	{
		double point[3] = { 0, };
		bool bIncludeTag = false;
		int numOfPoints = 0;
		shared_ptr<PointList> pointlist = make_shared<PointList>();

#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			pointlist->SetID(atoi((const char*)data->at(1)));
		if (pointlist->_id >= 0)
			pointlist->_id += _baseID;

#ifdef _DEBUG
		if (data->at(2) != NULL)
#endif
			numOfPoints = atoi((const char*)data->at(2));


		pointlist->Init(numOfPoints);
		for (int i = 0; i < numOfPoints; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + j + 3) != NULL)
#endif
					point[j] = atof((const char*)data->at(i * 3 + j + 3));
			}
			pointlist->SetPoint(i, point[0], point[1], point[2]);
		}

		if (data->size() > numOfPoints * 3 + 3)
			bIncludeTag = IsIncludeTag(data->at(numOfPoints * 3 + 3));
		if (bIncludeTag) {
			string str((char*)data->at(numOfPoints * 3 + 3));
			pointlist->SetTag(str);
		}

		if (IsIncludeUCS(data, Geom::G_POINTLIST)) {
			double ucsArgs[9] = { 0, };

			int idx;
			if (bIncludeTag)
				idx = numOfPoints * 3 + 4;
			else
				idx = numOfPoints * 3 + 3;

		}
		return pointlist;
	}

	shared_ptr<Polygon> KRFTextParser::TextToPolygon(vector<unsigned char*>* data)
	{
		double point[3] = { 0, };
		int numOfPoints = 0;
		shared_ptr<Polygon> polygon = make_shared<Polygon>();

#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			polygon->SetID(atoi((const char*)data->at(1)));
		if (polygon->_id >= 0)
			polygon->_id += _baseID;

#ifdef _DEBUG
		if (data->at(2) != NULL)
#endif
			numOfPoints = atoi((const char*)data->at(2));


		polygon->Init(numOfPoints);
		for (int i = 0; i < numOfPoints; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + j + 3) != NULL)
#endif
					point[j] = atof((const char*)data->at(i * 3 + j + 3));
			}
			polygon->SetPoint(i, point[0], point[1], point[2]);
		}

		if (data->size() > numOfPoints * 3 + 3) {
			string str((char*)data->at(numOfPoints * 3 + 3));
			polygon->SetTag(str);
		}
		return polygon;
	}

	shared_ptr<Sphere> KRFTextParser::TextToSphere(vector<unsigned char*>* data)
	{
		double args[4] = { 0, };
		shared_ptr<Sphere> sphere = make_shared<Sphere>();

#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			sphere->SetID(atoi((const char*)data->at(1)));
		if (sphere->_id >= 0)
			sphere->_id += _baseID;

		for (int i = 0; i < 4; i++)
		{
#ifdef _DEBUG
			if (data->at(i + 2) != NULL)
#endif
				args[i] = atof((const char*)data->at(i + 2));
		}

		sphere->Set(args[0], args[1], args[2], args[3]);

		// 태그 로드 추가. 마지막 parameter
		if (data->size() > 6 != NULL) {
			string str((char*)data->at(6));
			sphere->SetTag(str);
		}

		return sphere;
	}

	shared_ptr<Spline> KRFTextParser::TextToSpline(vector<unsigned char*>* data)
	{
		double point[3] = { 0, };
		bool bIncludeTag = false;
		int numOfPoints = 0;
		shared_ptr<Spline> spline = make_shared<Spline>();

#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			spline->SetID(atoi((const char*)data->at(1)));
		if (spline->_id >= 0)
			spline->_id += _baseID;

#ifdef _DEBUG
		if (data->at(2) != NULL)
#endif
			numOfPoints = atoi((const char*)data->at(2));


		spline->Init(numOfPoints);
		for (int i = 0; i < numOfPoints; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + j + 3) != NULL)
#endif
					point[j] = atof((const char*)data->at(i * 3 + j + 3));
			}
			spline->SetPoint(i, point[0], point[1], point[2]);
		}

		if (data->size() > numOfPoints * 3 + 3)
			bIncludeTag = IsIncludeTag(data->at(numOfPoints * 3 + 3));
		if (bIncludeTag) {
			string str((char*)data->at(numOfPoints * 3 + 3));
			spline->SetTag(str);
		}

		if (IsIncludeUCS(data, Geom::G_SPLINE)) {
			double ucsArgs[9] = { 0, };

			int idx;
			if (bIncludeTag)
				idx = numOfPoints * 3 + 4;
			else
				idx = numOfPoints * 3 + 3;

		}

		return spline;
	}

	shared_ptr<ProteinTrajectory> KRFTextParser::TextToProteinTrajectory(vector<unsigned char*>* data)
	{
		double point[3] = { 0, };
		char id;
		shared_ptr<ProteinTrajectory> pt = make_shared<ProteinTrajectory>();

#ifdef _DEBUG
		if (data->at(1) != NULL)
#endif
			pt->SetID(atoi((const char*)data->at(1)));
		if (pt->_id >= 0)
			pt->_id += _baseID;
#ifdef _DEBUG
		if (data->at(2) != NULL)
#endif
			pt->Init(atoi((const char*)data->at(2)));

		for (int i = 0; i < pt->_size; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + j + 3) != NULL)
#endif
					point[j] = atof((const char*)data->at(i * 3 + j + 3));
			}
			pt->SetPoint(i, point[0], point[1], point[2]);
		}

		for (int i = 0; i < pt->_size; i++)
		{
			for (int j = 0; j < 3; j++)
			{
#ifdef _DEBUG
				if (data->at(i * 3 + pt->_size * 3 + 3 + j))
#endif
					point[j] = atof((const char*)data->at(i * 3 + pt->_size * 3 + 3 + j));
			}
			pt->SetNormal(i, point[0], point[1], point[2]);
		}

		pt->_amino_type.assign((const char*)data->at(pt->_size * 6 + 3));

		int j = 0, dnaArmIdx = 0;
		bool isDna = false;

		if (data->size() > pt->_size * 6 + 4 && strncmp((const char*)data->at(pt->_size * 6 + 4), "true", 4) == 0) {

			pt->_isDna = true;
			int dnaArmSize = pt->_size;
			pt->_dnaArm.resize(dnaArmSize);

			int i, j = 0, subArmSize, k = 0;
			for (i = 0; i < dnaArmSize; ++i) {
				subArmSize = atoi((const char*)data->at(pt->_size * 6 + 5 + i + j));
				if (subArmSize > 10000)
				{
					cout << "stop" << endl;
				}
				for (k = 0; k < subArmSize; ++k) {
					pt->_dnaArm.at(i).push_back(atoi((const char*)data->at(pt->_size * 6 + 6 + i + j + k)));
				}
				j += subArmSize;
			}
			if (data->size() > pt->_size * 6 + 6 + i + j) {
				string str((char*)data->at(pt->_size * 6 + 6 + i + j));
				pt->SetTag(str);
			}
		}
		else if(data->size() > pt->_size * 6 + 4  && strncmp((const char*)data->at(pt->_size * 6 + 4), "false", 5) == 0) {
			pt->_isDna = false;
			if (data->size() > pt->_size * 6 + 5) {
				string str((char*)data->at(pt->_size * 6 + 5));
				pt->SetTag(str);
			}
		}
		else {
			if (data->size() > pt->_size * 6 + 4) {
				string str((char*)data->at(pt->_size * 6 + 4));
				pt->SetTag(str);
			}
		}

		return pt;
	}

	shared_ptr<EndGroup> KRFTextParser::TextToEndGroup(vector<unsigned char*>* data)
	{
		shared_ptr<EndGroup> endgroup = make_shared<EndGroup>();
#ifdef _DEBUG		
		if (data->at(1) != NULL)
#endif
			endgroup->SetID(atoi((const char*)data->at(1)));
		if (endgroup->_id >= 0)
			endgroup->_id += _baseID;
		if (data->size() > 2) {
			string str((char*)data->at(2));
			endgroup->SetTag(str);
		}
		return endgroup;
	}

	shared_ptr<ExtraData> KRFTextParser::TextToExtraData(vector<unsigned char*>* data)
	{
		shared_ptr<ExtraData> extradata = make_shared<ExtraData>();

		int idx = data->size()-1;
		unsigned char* last = data->at(idx);
		int len = strlen((const char*)last);
		bool bIncludeTag = false;

		for (int i = 0; i < len; ++i) {
			if (last[i] == '=') {
				bIncludeTag = true;
				break;
			}
		}
		extradata->SetID(atoi((const char*)data->at(1)));

		int dataLen = bIncludeTag ? idx - 1 : idx + 1;
		for (int i = 2; i < dataLen - 1; ++i) {
			string str((char*)data->at(i));
			extradata->_data += str + ",";
		}
		string str((char*)data->at(dataLen - 1));
		extradata->_data += str;

		if (bIncludeTag) {
			string str((char*)data->at(idx));
			extradata->SetTag(str);
		}


		return extradata;
	}




	string KRFTextParser::ArcToText(shared_ptr<Arc> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);

		ret += "," + to_string(geom->_center._x);
		ret += "," + to_string(geom->_center._y);
		ret += "," + to_string(geom->_center._z);

		ret += "," + to_string(geom->_radius) + "," + to_string(geom->_angle_st) + "," + to_string(geom->_angle_ed);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::Arc2ToText(shared_ptr<Arc2> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);

		ret += "," + to_string(geom->_center._x);
		ret += "," + to_string(geom->_center._y);
		ret += "," + to_string(geom->_center._z);

		ret += "," + to_string(geom->_radius);
		ret += "," + to_string(geom->_pt_st._x) + "," + to_string(geom->_pt_st._y) + "," + to_string(geom->_pt_st._z);
		ret += "," + to_string(geom->_pt_ed._x) + "," + to_string(geom->_pt_ed._y) + "," + to_string(geom->_pt_ed._z);

		ret += "," + to_string(geom->_normal._x) + "," + to_string(geom->_normal._y) + "," + to_string(geom->_normal._z);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::BondToText(shared_ptr<Bond> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->_atom1ID);
		ret += "," + to_string(geom->_atom2ID);
		ret += "," + to_string(geom->_bondType);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::CircleToText(shared_ptr<Circle> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->_center._x);
		ret += "," + to_string(geom->_center._y);
		ret += "," + to_string(geom->_center._z);

		ret += "," + to_string(geom->_radius);

		ret += "," + to_string(geom->_normal._x) + "," + to_string(geom->_normal._y) + "," + to_string(geom->_normal._z);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::CylinderToText(shared_ptr<Cylinder> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);

		ret += "," + to_string(geom->_p1._x);
		ret += "," + to_string(geom->_p1._y);
		ret += "," + to_string(geom->_p1._z);

		ret += "," + to_string(geom->_p2._x);
		ret += "," + to_string(geom->_p2._y);
		ret += "," + to_string(geom->_p2._z);

		ret += "," + to_string(geom->_radius);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::GroupToText(shared_ptr<Group> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		for (int i = 0; i < geom->GetNumberOfChildren(); ++i) {
			ret += "\n" + GeomToText(geom->Get(i));
		}
		return ret;
	}

	string KRFTextParser::EndGroupToText(shared_ptr<EndGroup> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);

		return ret;
	}

	string KRFTextParser::LineSegToText(shared_ptr<LineSeg> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->_p1._x);
		ret += "," + to_string(geom->_p1._y);
		ret += "," + to_string(geom->_p1._z);
		ret += "," + to_string(geom->_p2._x);
		ret += "," + to_string(geom->_p2._y);
		ret += "," + to_string(geom->_p2._z);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::MaterialToText(shared_ptr<Material> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::MeshToText(shared_ptr<Mesh> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->GetNumVertex());

		if (geom->_uv == NULL) {
			ret += ",0";
		}
		else {
			ret += "," + to_string(geom->GetNumVertex());
		}

		ret += "," + to_string(geom->GetNumTris());


		for (int i = 0; i < geom->_num_vertex * 3; i++)
		{
			ret += "," + to_string(geom->_vertex[i]);
		}

		if (geom->_uv != NULL) {
			for (int i = 0; i < geom->_num_vertex * 2; i++)
			{
				ret += "," + to_string(geom->_uv[i]);
			}
		}

		for (int i = 0; i < geom->_num_tris * 3; i++)
		{
			ret += "," + to_string(geom->_index[i]);
		}

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::PLineToText(shared_ptr<PLine> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->GetNumberOfPoints());
		for (int i = 0; i < geom->GetNumberOfPoints() * 3; ++i) {
			ret += "," + to_string(geom->_points[i]);
		}

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::PointToText(shared_ptr<Point> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->_x) + "," + to_string(geom->_y) + "," + to_string(geom->_z);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::PointListToText(shared_ptr<PointList> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->GetNumberOfPoints());
		for (int i = 0; i < geom->GetNumberOfPoints() * 3; ++i) {
			ret += "," + to_string(geom->_points[i]);
		}

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::PolygonToText(shared_ptr<Polygon> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->GetNumberOfPoints());
		int num = geom->GetNumberOfPoints() * 3;
		for (int i = 0; i < num; ++i) {
			ret += "," + to_string(geom->_points[i]);
		}

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::SphereToText(shared_ptr<Sphere> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->_center._x);
		ret += "," + to_string(geom->_center._y);
		ret += "," + to_string(geom->_center._z);

		ret += "," + to_string(geom->_radius);

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::SplineToText(shared_ptr<Spline> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->GetNumberOfPoints());
		for (int i = 0; i < geom->GetNumberOfPoints() * 3; ++i) {
			ret += "," + to_string(geom->_points[i]);
		}

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::ProteinTrajectoryToText(shared_ptr<ProteinTrajectory> geom)
	{
		string ret = geom->GetTypeName();
		ret += "," + to_string(geom->_id);
		ret += "," + to_string(geom->_size);
		for (int j = 0; j < geom->_size; j++) {
			ret += "," + to_string(geom->_points.at(j * 3));
			ret += "," + to_string(geom->_points.at(j * 3 + 1));
			ret += "," + to_string(geom->_points.at(j * 3 + 2));
		}
		for (int j = 0; j < geom->_size; j++) {
			ret += "," + to_string(geom->_normal.at(j * 3));
			ret += "," + to_string(geom->_normal.at(j * 3 + 1));
			ret += "," + to_string(geom->_normal.at(j * 3 + 2));
		}

		ret += "," + geom->_amino_type;
		
		if (geom->_isDna)
			ret += ",true";
		else
			ret += ",false";

		if (geom->_isDna) {
			for (int j = 0; j < geom->_dnaArm.size(); ++j) {
				ret += "," + to_string(geom->_dnaArm.at(j).size());
				for (int k = 0; k < geom->_dnaArm.at(j).size(); ++k) {
					ret += "," + to_string(geom->_dnaArm.at(j).at(k));
				}
			}
		}

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	string KRFTextParser::ExtraDataToText(shared_ptr<ExtraData> geom)
	{
		string ret = geom->GetTypeName();
		if (geom->_encodedData.size() > 0) {
			ret += "," + geom->_encodedData;
		}
		else {
			ret += "," + geom->_data;
		}

		if (geom->_tag != NULL)
			ret += "," + geom->_tag->ToString();

		return ret;
	}

	void KRFTextParser::SetBaseID4Load(int base_id)
	{
		_baseID = base_id;
	}

	bool KRFTextParser::IsIncludeTag(unsigned char* data)
	{
		int chunkSize = strlen((const char*)data);

		if (chunkSize <= 0)
			return false;

		for (int i = 0; i < chunkSize; ++i) {
			if (data[i] == '=') {
				return true;
			}
		}

		return false;
	}

	bool KRFTextParser::IsIncludeUCS(vector<unsigned char*>* data, int geomType)
	{
		// tag까지 포함한 뒤 + 9 - 2
		switch (geomType)
		{
		case Geom::G_ARC2:
			if (data->size() > 18)
				return true;
			break;

		case Geom::G_CIRCLE:
			if (data->size() > 17)
				return true;
			break;

		case Geom::G_LINE:
			if (data->size() > 16)
				return true;
			break;

		case Geom::G_PLINE:
			if (data->size() > atoi((const char*)(data->at(2))) * 3 + 11)
				return true;
			break;

		case Geom::G_POINT:
			if (data->size() > 11)
				return true;
			break;

		case Geom::G_POINTLIST:
			if (data->size() > atoi((const char*)(data->at(2))) * 3 + 11)
				return true;
			break;

		case Geom::G_SPLINE:
			if (data->size() > atoi((const char*)(data->at(2))) * 3 + 11)
				return true;
			break;
		}
		return false;
	}

	int KRFTextParser::GetBaseID()
	{
		return _baseID;
	}


	shared_ptr<CommandList> KRFTextParser::GetCommandList() {
		return _commandList;
	}

	void KRFTextParser::GetCommands(shared_ptr<CommandList> commands) {

		int len = _commandList->GetNumberOfCommands();
		for (int i = 0; i < len; i++) {
			auto cmd = _commandList->GetCommand(i);
			commands->_Add(cmd);
		}
	}

#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_krf_text_parser) {
		class_<RayCad::KRFTextParser>("KRFTextParser")
			.smart_ptr_constructor("KRFTextParser", &std::make_shared<KRFTextParser>)

			.function("GetCommandList", &RayCad::KRFTextParser::GetCommandList)
			.function("GetCommands", &RayCad::KRFTextParser::GetCommands)
			.function("Load", &RayCad::KRFTextParser::Load)
			.class_function("SetBaseID4Load", &RayCad::KRFTextParser::SetBaseID4Load)
			.class_function("GetBaseID", &RayCad::KRFTextParser::GetBaseID)
			;
	}

#endif



}