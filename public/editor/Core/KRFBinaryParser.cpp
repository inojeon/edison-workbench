#include "pch.h"

namespace RayCad 
{

	int KRFBinaryParser::_baseID = 0;

	KRFBinaryParser::KRFBinaryParser() {
		_geoms = new vector<shared_ptr<Geom>>();
		_commandList = make_shared<CommandList>();
	}


	int KRFBinaryParser::GetLineCount(){
		return _tokens.size();
	}


	void KRFBinaryParser::ReadFromLines(string str_lines)
	{
#ifdef _CPP
		char* lines = _strdup(str_lines.c_str());
#endif
#ifndef _CPP
		char* lines = strdup(str_lines.c_str());
#endif
		vector<char*> tmp;
		int i = 0, j = 0, idx = 0;
		bool endLine = false;
		int k = 0;

		while (lines[i] != '\0')
		{

			if (lines[i] == ',')
			{
				lines[i] = '\0';
				tmp.push_back(lines + j);
				j = i + 1;
			}

#ifdef _CPP

			if (lines[i] == '\n')
			{
				lines[i] = '\0';
				tmp.push_back(lines + j);
				j = i + 1;

				_tokens.push_back(tmp);
				tmp.clear();
				idx++;
			}
#endif
#ifndef _CPP
			if(lines[i] == 13 && lines[i+1] == 10)

			{
				lines[i] = '\0';
				lines[i + 1] = '\0';
				tmp.push_back(lines + j);
				j = i + 2;
				_tokens.push_back(tmp);
				tmp.clear();
				idx++;
				i++;
			}
#endif
			i++;
		}
		lines[i] = '\0';
		tmp.push_back(lines + j);
		_tokens.push_back(tmp);

		_numOfTokens = idx;
	}


	bool KRFBinaryParser::WriteBinary(string filename, shared_ptr<MemoryBlock> block)
	{
		FILE* fp = NULL;
		fp = fopen(filename.c_str(), "wb");
		if (fp) {
			fwrite(block->_data, block->_size, 1, fp);
			fclose(fp);
			return true;
		}
		return false;
	}


	bool KRFBinaryParser::ReadBinary(string filename, shared_ptr<MemoryBlock> block)
	{
		FILE* fp;
		fp = fopen(filename.c_str(), "rb");

		if (fp) {
			fseek(fp, 0, SEEK_END);
			int length = ftell(fp);
			fseek(fp, 0, SEEK_SET);

			block->Create(length);
			fread(block->_data, block->_size, 1, fp);
			fclose(fp);

			while (block->_ptr < length) {
				shared_ptr<Geom> geom = this->ParseBlock(block);
				this->_geoms->push_back(geom);
			}
		}
		return true;
	}

	bool KRFBinaryParser::AddBinaryToGeom(shared_ptr<MemoryBlock> block)
	{
		while (block->_ptr < block->_size) {
			shared_ptr<Geom> geom = this->ParseBlock(block);
			this->_geoms->push_back(geom);
		}
		return true;
	}

	shared_ptr<CommandList> KRFBinaryParser::GetCommandList()
	{
		return this->_commandList;
	}

	bool KRFBinaryParser::BinaryToGeom(shared_ptr<MemoryBlock> block, shared_ptr<CommandList> cmdlist)
	{
		while (block->_ptr < block->_size) {
			shared_ptr<Geom> geom = KRFBinaryParser::ParseBlock(block);
			cmdlist->_Add(geom);
		}
		return true;
	}

	void KRFBinaryParser::SetBaseID4Load(int base_id)
	{
		_baseID = base_id;
	}

	int KRFBinaryParser::GetBaseID()
	{
		return _baseID;
	}

	vector<shared_ptr<Geom>>* KRFBinaryParser::GetGeoms()
	{
		return _geoms;
	}

	shared_ptr<Geom> KRFBinaryParser::GetGeom(int idx)
	{
		if (_geoms->size() > idx) {
			return _geoms->at(idx);
		}
		return NULL;
	}

	void KRFBinaryParser::ParseCommandListToBinaryBlock(shared_ptr<CommandList> commandList, shared_ptr<MemoryBlock> data)
	{
		int totalLen = 0;
		int iter = commandList->GetNumberOfCommands();

		for (int i = 0; i < iter; i++)
			totalLen += commandList->GetCommand(i)->GetBinarySize(true);

		data->Create(totalLen);

		for (int i = 0; i < iter; i++) {
			shared_ptr<Geom> currentCommand = commandList->GetCommand(i);
		
			if (currentCommand != nullptr) {
				currentCommand->ToBinary(data.get(), data->_ptr);
			}
		}
	}


	shared_ptr<Geom> KRFBinaryParser::ParseLine(int idx)
	{
		int geom_type = -1;
		vector<char*> geom_token = _tokens.at(idx);

		switch (geom_token[0][0])
		{
		case 'A':
			if (!strncmp(geom_token[0], "Arc", 3))
			{
				auto ret = shared_ptr<Arc2>(new Arc2());
				ret->_id = atoi(geom_token[1]);
				if(ret->_id >= 0)
					ret->_id += _baseID;
				ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]), atof(geom_token[5]), atof(geom_token[6]), atof(geom_token[7]), atof(geom_token[8]), atof(geom_token[9]), atof(geom_token[10]), atof(geom_token[11]));
				ret->SetNormal(atof(geom_token[12]), atof(geom_token[13]), atof(geom_token[14]));
				return (shared_ptr<Geom>)ret;
			}
			else if (!strncmp(geom_token[0], "Atom", 4))
			{
				auto ret = shared_ptr<Atom>(new Atom());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]));

				if (geom_token[5])
					ret->SetCharge(atoi(geom_token[5]));

				return (shared_ptr<Geom>) ret;
			}
			break;

		case 'B':
			if (!strncmp(geom_token[0], "Bond", 4))
			{
				auto ret = shared_ptr<Bond>(new Bond());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				//ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]), atof(geom_token[5]), atof(geom_token[6]), atof(geom_token[7]));

				return (shared_ptr<Bond>)ret;
			}

		case 'C':
			if (!strncmp(geom_token[0], "Circle", 6))
			{
				auto ret = shared_ptr<Circle>(new Circle());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]), atof(geom_token[5]));
				ret->SetNormal(atof(geom_token[6]), atof(geom_token[7]), atof(geom_token[8]));
				
				return (shared_ptr<Geom>)ret;
			}
			else if (!strncmp(geom_token[0], "Cylinder", 8))
			{
				auto ret = shared_ptr<Cylinder>(new Cylinder());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]), atof(geom_token[5]), atof(geom_token[6]), atof(geom_token[7]), atof(geom_token[8]));
			
				return (shared_ptr<Cylinder>)ret;
			}
			break;

		case 'E':
			if (!strncmp(geom_token[0], "EndGroup", 8))
			{
				auto ret = shared_ptr<EndGroup>(new EndGroup());
				return (shared_ptr<Geom>)ret;
			}
			else if (!strncmp(geom_token[0], "ExtraData", 10))
			{
				auto ret = shared_ptr<ExtraData>(new ExtraData());
				return (shared_ptr<Geom>)ret;
			}
			break;

		case 'G':
			if (!strncmp(geom_token[0], "Group", 5))
			{
				auto ret = shared_ptr<Group>(new Group());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				return (shared_ptr<Geom>) ret;
			}
			break;

		case 'L':
			if (!strncmp(geom_token[0], "LineSeg", 7))
			{
				auto ret = shared_ptr<LineSeg>(new LineSeg());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]), atof(geom_token[5]), atof(geom_token[6]), atof(geom_token[7]));

				return (shared_ptr<Geom>) ret;
			}
			break;

		case 'M':
			if (!strncmp(geom_token[0], "Mesh", 4))
			{
				auto ret = shared_ptr<Mesh>(new Mesh());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				int num_vertex = atoi(geom_token[2]);
				int num_uv = atoi(geom_token[3]);
				int num_tris = atoi(geom_token[4]);
				ret->Init(num_vertex, num_tris);

				if (num_uv > 0)
					ret->CreateUV();

				int header = 5;
				int startIdx = header;
				for (int i = 0; i < ret->GetNumVertex(); i++)
				{
					int idx = i * 3 + startIdx;
					try {
						ret->SetVertex(i, atof(geom_token[idx]), atof(geom_token[idx + 1]), atof(geom_token[idx + 2]));
					}
					catch (exception e) {
						ret->SetVertex(i, 0, 0, 0);
					}
				}

				if (num_uv > 0) {
					startIdx = num_vertex * 3 + header;
					for (int i = 0; i < ret->GetNumTris(); i++)
					{
						int idx = startIdx + i * 2;
						try {
							ret->SetUV(i, atof(geom_token[idx]), atof(geom_token[idx + 1]));
						}
						catch (exception e) {
							ret->SetVertex(i, 0, 0, 0);
						}
					}

					startIdx = num_vertex * 3 + num_uv * 2 + header;
					for (int i = 0; i < ret->GetNumTris(); i++)
					{
						int idx = startIdx + i * 3;
						try {
							int i1 = atoi(geom_token[idx]);
							int i2 = atoi(geom_token[idx + 1]);
							int i3 = atoi(geom_token[idx + 2]);
							ret->SetTri(i, i1, i2, i3);
						}
						catch (exception e) {
							ret->SetTri(i, 0, 0, 0);
						}
					}
				}
				return (shared_ptr<Geom>)ret;
			}
			else if (!strncmp(geom_token[0], "Material", 8))
			{
				auto ret = shared_ptr<Material>(new Material());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				return (shared_ptr<Geom>) ret;
			}
			break;
			

		case 'P':
			if (!strncmp(geom_token[0], "PLine", 5))
			{
				auto ret = shared_ptr<PLine>(new PLine());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Init(atoi(geom_token[2]));

				for (int i = 0; i < ret->GetNumberOfPoints(); ++i)
				{
					try {
						ret->SetPoint(i, atof(geom_token[(size_t)3 + i * 3]), atof(geom_token[(size_t)4 + i * 3]), atof(geom_token[(size_t)5 + i * 3]));
					}
					catch (exception e) {
						ret->SetPoint(i, 0, 0, 0);
					}
				}

				return (shared_ptr<Geom>)ret;
			}
			else if (!strncmp(geom_token[0], "Point", 5))
			{
				auto ret = shared_ptr<Point>(new Point());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]));

				return (shared_ptr<Geom>)ret;
			}
			else if (!strncmp(geom_token[0], "PointList", 9))
			{
				auto ret = shared_ptr<PointList>(new PointList());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Init(atoi(geom_token[2]));

				for (int i = 0; i < ret->GetNumberOfPoints(); ++i)
				{
					try {
						ret->SetPoint(i, atof(geom_token[(size_t)3 + i * 3]), atof(geom_token[(size_t)4 + i * 3]), atof(geom_token[(size_t)5 + i * 3]));
					}
					catch (exception e) {
						ret->SetPoint(i, 0, 0, 0);
					}
				}

				return (shared_ptr<Geom>) ret;
			}
			else if(!strncmp(geom_token[0], "Polygon", 7))
			{
				auto ret = shared_ptr<Polygon>(new Polygon());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Init(atof(geom_token[2]));

				for(int i=0; i<ret->GetNumberOfPoints(); ++i)
				{
					try{
						ret->SetPoint(i, atof(geom_token[(size_t)3 + i * 3]), atof(geom_token[(size_t)4 + i * 3]), atof(geom_token[(size_t)5 + i*3]));
					}
					catch (exception e){
						ret->SetPoint(i,0,0,0);
					}
				}
				return (shared_ptr<Geom>) ret;
			}
			else if (!strncmp(geom_token[0], "ProteinTrajectory", 17))
			{
				auto ret = shared_ptr<ProteinTrajectory>(new ProteinTrajectory());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Init(atoi(geom_token[2]));

				int idx = 0;
				for (int i = 0; i < ret->_size; ++i)
				{
					try {
						ret->SetPoint(i, atof(geom_token[3 + i * 3]), atof(geom_token[4 + i * 3]), atof(geom_token[5 + i * 3]));
					}
					catch (exception e) {
						ret->SetPoint(i, 0, 0, 0);
					}
				}
					
				idx += ret->_size * 3;
				for (int i = 0; i < ret->_size; ++i)
				{
					try {
						ret->SetNormal(i, atof(geom_token[idx + 3 + i * 3]), atof(geom_token[idx + 4 + i * 3]), atof(geom_token[idx + 5 + i * 3]));
					}
					catch (exception e) {
						ret->SetNormal(i, 0, 0, 0);
					}
				}

				idx += ret->_size * 3;
				for (int i = 0; i < ret->_size; ++i)
				{
					try {
						ret->SetAminoType(i, *(geom_token[idx + 3]));
					}
					catch (exception e) {
						ret->SetAminoType(i, '\0');
					}
				}
					
				return (shared_ptr<Geom>)ret;
			}
			break;

		case 'S':
			if (!strncmp(geom_token[0], "Sphere", 6))
			{
				auto ret = shared_ptr<Sphere>(new Sphere());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Set(atof(geom_token[2]), atof(geom_token[3]), atof(geom_token[4]), atof(geom_token[5]));
				return (shared_ptr<Geom>) ret;
			}
			else if (!strncmp(geom_token[0], "Spline", 6))
			{
				auto ret = shared_ptr<Spline>(new Spline());
				ret->_id = atoi(geom_token[1]);
				if (ret->_id >= 0)
					ret->_id += _baseID;
				ret->Init(atof(geom_token[2]));

				for (int i = 0; i < ret->GetNumberOfPoints(); ++i)
				{
					try {
						ret->SetPoint(i, atof(geom_token[(size_t)3 + i * 3]), atof(geom_token[(size_t)4 + i * 3]), atof(geom_token[(size_t)5 + i * 3]));
					}
					catch (exception e) {
						ret->SetPoint(i, 0, 0, 0);
					}
				}

				return (shared_ptr<Geom>) ret;
			}
			break;
		}

		return NULL;
	}

	shared_ptr<Geom> KRFBinaryParser::ParseBlock(shared_ptr<MemoryBlock> data)
	{
		int p = 4 + data->_ptr;
		int geom_type = data->GetShort(p);
		switch (geom_type)
		{
		case Geom::G_ATOM:
			return ParseAtom(data);
			break;

		case Geom::G_ARC:
			return ParseArc(data);
			break;

		case Geom::G_ARC2:
			return ParseArc2(data);
			break;

		case Geom::G_BOND:
			return ParseBond(data);
			break;

		case Geom::G_CIRCLE:
			return ParseCircle(data);
			break;

		case Geom::G_CYLINDER:
			return ParseCylinder(data);
			break;

		case Geom::G_GROUP:
			return ParseGroup(data);
			break;

		case Geom::G_ENDGROUP:
			return ParseEndGroup(data);
			break;

		case Geom::G_LINE:
			return ParseLineSeg(data);
			break;

		case Geom::G_MATERIAL:
			return ParseMaterial(data);
			break;

		case Geom::G_MESH:
			return ParseMesh(data);
			break;

		case Geom::G_PLINE:
			return ParsePLine(data);
			break;

		case Geom::G_POINTLIST:
			return ParsePointList(data);
			break;

		case Geom::G_POINT:
			return ParsePoint(data);
			break;

		case Geom::G_POLYGON:
			return ParsePolygon(data);
			break;

		case Geom::G_SPHERE:
			return ParseSphere(data);
			break;

		case Geom::G_SPLINE:
			return ParseSpline(data);
			break;

		case Geom::G_PROTEIN_TRAJECTORY:
			return ParseProteinTrajectory(data);
			break;

		case Geom::G_DIM:
			return ParseDim(data);
			break;

		case Geom::G_EXTRADATA:
			return ParseExtraData(data);
			break;

		default:
			data->_ptr += sizeof(short);
		}
		return NULL;
	}

	shared_ptr<Point> KRFBinaryParser::ParsePoint(shared_ptr<MemoryBlock> data) {

		shared_ptr<Point> point = make_shared<Point>();

		int size = data->GetInt(data->_ptr);
		point->_type = data->GetShort(data->_ptr);
		point->_id = data->GetInt(data->_ptr);
		if (point->_id >= 0)
			point->_id += _baseID;

		point->_x = data->GetDouble(data->_ptr);
		point->_y = data->GetDouble(data->_ptr);
		point->_z = data->GetDouble(data->_ptr);

		int diff = size - point->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			point->SetTag(tagTokens);
		}

		return point;
	}

	shared_ptr<Atom> KRFBinaryParser::ParseAtom(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Atom> atom = make_shared<Atom>();

		int size = data->GetInt(data->_ptr);
		atom->_type = data->GetShort(data->_ptr);
		atom->_id = data->GetInt(data->_ptr);
		if (atom->_id >= 0)
			atom->_id += _baseID;

		atom->_center._x = data->GetDouble(data->_ptr);
		atom->_center._y = data->GetDouble(data->_ptr);
		atom->_center._z = data->GetDouble(data->_ptr);

		atom->_atomID = data->GetInt(data->_ptr);

		atom->_charge = data->GetInt(data->_ptr);

		int diff = size - atom->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			atom->SetTag(tagTokens);
		}

		return atom;
	}

	shared_ptr<Arc2> KRFBinaryParser::ParseArc(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Arc2> arc = make_shared<Arc2>();

		int size = data->GetInt(data->_ptr);
		arc->_type = data->GetShort(data->_ptr);
		arc->_id = data->GetInt(data->_ptr);
		if (arc->_id >= 0)
			arc->_id += _baseID;

		arc->_center._x = data->GetDouble(data->_ptr);
		arc->_center._y = data->GetDouble(data->_ptr);
		arc->_center._z = data->GetDouble(data->_ptr);

		arc->_radius = data->GetDouble(data->_ptr);

		double angle_st = data->GetDouble(data->_ptr);
		double angle_ed = data->GetDouble(data->_ptr);

		double r_st = (angle_st / 180.0) * ((double)M_PI);
		arc->_pt_st._x = cos(r_st) * arc->_radius + arc->_center._x;
		arc->_pt_st._y = sin(r_st) * arc->_radius + arc->_center._y;
		arc->_pt_st._z = 0;

		double r_ed = (angle_ed / 180.0) * ((double)M_PI);
		arc->_pt_ed._x = cos(r_ed) * arc->_radius + arc->_center._x;
		arc->_pt_ed._y = sin(r_ed) * arc->_radius + arc->_center._y;
		arc->_pt_ed._z = 0;

		arc->_normal._x = data->GetDouble(data->_ptr);
		arc->_normal._y = data->GetDouble(data->_ptr);
		arc->_normal._z = data->GetDouble(data->_ptr);

		// diff가 0보다 큰 경우 tag도 존재
		int diff = size - arc->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			arc->SetTag(tagTokens);
		}

		return arc;
	}

	shared_ptr<Arc2> KRFBinaryParser::ParseArc2(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Arc2> arc = make_shared<Arc2>();

		int size = data->GetInt(data->_ptr);
		arc->_type = data->GetShort(data->_ptr);
		arc->_id = data->GetInt(data->_ptr);
		if (arc->_id >= 0)
			arc->_id += _baseID;

		arc->_center._x = data->GetDouble(data->_ptr);
		arc->_center._y = data->GetDouble(data->_ptr);
		arc->_center._z = data->GetDouble(data->_ptr);

		arc->_radius = data->GetDouble(data->_ptr);
		
		arc->_pt_st._x = data->GetDouble(data->_ptr);
		arc->_pt_st._y = data->GetDouble(data->_ptr);
		arc->_pt_st._z = data->GetDouble(data->_ptr);

		arc->_pt_ed._x = data->GetDouble(data->_ptr);
		arc->_pt_ed._y = data->GetDouble(data->_ptr);
		arc->_pt_ed._z = data->GetDouble(data->_ptr);

		arc->_normal._x = data->GetDouble(data->_ptr);
		arc->_normal._y = data->GetDouble(data->_ptr);
		arc->_normal._z = data->GetDouble(data->_ptr);

		int diff = size - arc->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			arc->SetTag(tagTokens);
		}

		return arc;
	}

	shared_ptr<Bond> KRFBinaryParser::ParseBond(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Bond> bond = make_shared<Bond>();

		int size = data->GetInt(data->_ptr);
		bond->_type = data->GetShort(data->_ptr);
		bond->_id = data->GetInt(data->_ptr);
		if (bond->_id >= 0)
			bond->_id += _baseID;

		/*
		bond->_p1._x = data->GetDouble(data->_ptr);
		bond->_p1._y = data->GetDouble(data->_ptr);
		bond->_p1._z = data->GetDouble(data->_ptr);

		bond->_p2._x = data->GetDouble(data->_ptr);
		bond->_p2._y = data->GetDouble(data->_ptr);
		bond->_p2._z = data->GetDouble(data->_ptr);
		*/

		bond->_atom1ID = data->GetInt(data->_ptr);
		bond->_atom2ID = data->GetInt(data->_ptr);
		bond->_bondType = data->GetInt(data->_ptr);

		int diff = size - bond->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			bond->SetTag(tagTokens);
		}

		return bond;
	}

	shared_ptr<Circle> KRFBinaryParser::ParseCircle(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Circle> circle = make_shared<Circle>();
		
		int size = data->GetInt(data->_ptr);
		circle->_type = data->GetShort(data->_ptr);
		circle->_id = data->GetInt(data->_ptr);
		if (circle->_id >= 0)
			circle->_id += _baseID;

		circle->_center._x = data->GetDouble(data->_ptr);
		circle->_center._y = data->GetDouble(data->_ptr);
		circle->_center._z = data->GetDouble(data->_ptr);

		circle->_radius = data->GetDouble(data->_ptr);

		circle->_normal._x = data->GetDouble(data->_ptr);
		circle->_normal._y = data->GetDouble(data->_ptr);
		circle->_normal._z = data->GetDouble(data->_ptr);

		int diff = size - circle->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			circle->SetTag(tagTokens);
		}

		return circle;
	}

	shared_ptr<Cylinder> KRFBinaryParser::ParseCylinder(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Cylinder> cylinder = make_shared<Cylinder>();

		int size = data->GetInt(data->_ptr);
		cylinder->_type = data->GetShort(data->_ptr);
		cylinder->_id = data->GetInt(data->_ptr);
		if (cylinder->_id >= 0)
			cylinder->_id += _baseID;

		cylinder->_p1._x = data->GetDouble(data->_ptr);
		cylinder->_p1._y = data->GetDouble(data->_ptr);
		cylinder->_p1._z = data->GetDouble(data->_ptr);

		cylinder->_p2._x = data->GetDouble(data->_ptr);
		cylinder->_p2._y = data->GetDouble(data->_ptr);
		cylinder->_p2._z = data->GetDouble(data->_ptr);

		cylinder->_radius = data->GetDouble(data->_ptr);

		int diff = size - cylinder->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			cylinder->SetTag(tagTokens);
		}

		return cylinder;
	}

	shared_ptr<Geom> KRFBinaryParser::ParseGeom(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Geom> geom = make_shared<Geom>();

		int size = data->GetInt(data->_ptr);
		geom->_type = data->GetShort(data->_ptr);
		geom->_id = data->GetInt(data->_ptr);
		if (geom->_id >= 0)
			geom->_id += _baseID;

		int diff = size - geom->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			geom->SetTag(tagTokens);
		}

		return geom;
	}

	shared_ptr<Group> KRFBinaryParser::ParseGroup(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Group> group = make_shared<Group>();
		int initialPtr = data->_ptr;
		int size = data->GetInt(data->_ptr);
		group->_type = data->GetShort(data->_ptr);
		group->_id = data->GetInt(data->_ptr);
		if (group->_id >= 0)
			group->_id += _baseID;
		group->_tokenSize = data->GetInt(data->_ptr);

		int tokenSize = group->_tokenSize;
		if (tokenSize > 0)
		{
			char* tagTokens = new char[tokenSize];
			data->Read(data->_ptr, tagTokens, tokenSize);
			group->SetTag(tagTokens);
		}

		while(data->_ptr - initialPtr < size - 10){
			group->Add(ParseBlock(data));
		}

		ParseBlock(data);

		return group;

	}

	shared_ptr<EndGroup> KRFBinaryParser::ParseEndGroup(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<EndGroup> endgroup = make_shared<EndGroup>();

		int size = data->GetInt(data->_ptr);
		endgroup->_type = data->GetShort(data->_ptr);
		endgroup->_id = data->GetInt(data->_ptr);
		if (endgroup->_id >= 0)
			endgroup->_id += _baseID;

		int diff = size - endgroup->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			endgroup->SetTag(tagTokens);
		}

		return endgroup;
	}

	shared_ptr<LineSeg> KRFBinaryParser::ParseLineSeg(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<LineSeg> line = make_shared<LineSeg>();

		int size = data->GetInt(data->_ptr);
		line->_type = data->GetShort(data->_ptr);
		line->_id = data->GetInt(data->_ptr);
		if (line->_id >= 0)
			line->_id += _baseID;

		line->_p1._x = data->GetDouble(data->_ptr);
		line->_p1._y = data->GetDouble(data->_ptr);
		line->_p1._z = data->GetDouble(data->_ptr);

		line->_p2._x = data->GetDouble(data->_ptr);
		line->_p2._y = data->GetDouble(data->_ptr);
		line->_p2._z = data->GetDouble(data->_ptr);

		int diff = size - line->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			line->SetTag(tagTokens);
		}

		return line;
	}

	shared_ptr<Mesh> KRFBinaryParser::ParseMesh(shared_ptr<MemoryBlock> data)
	{
		double x, y, z;
		float u, v;
		int t1, t2, t3;

		shared_ptr<Mesh> mesh = make_shared<Mesh>();

		int size = data->GetInt(data->_ptr);
		mesh->_type = data->GetShort(data->_ptr);
		mesh->_id = data->GetInt(data->_ptr);
		if (mesh->_id >= 0)
			mesh->_id += _baseID;

		mesh->_num_vertex = data->GetInt(data->_ptr);
		int num_uv = data->GetInt(data->_ptr);

		mesh->_num_tris = data->GetInt(data->_ptr);

		mesh->Init(mesh->_num_vertex, mesh->_num_tris);
		if (num_uv > 0)
			mesh->CreateUV();

		for (int j = 0; j < mesh->_num_vertex; j++) 
		{
			x = data->GetDouble(data->_ptr);
			y = data->GetDouble(data->_ptr);
			z = data->GetDouble(data->_ptr);
			mesh->SetVertex(j, x, y, z);
		}

		if (num_uv > 0)
		{
			for (int j = 0; j < mesh->_num_vertex; j++)
			{
				u = data->GetDouble(data->_ptr);
				v = data->GetDouble(data->_ptr);
				mesh->SetUV(j, u, v);
			}
		}

		for (int j = 0; j < mesh->_num_tris; j++)
		{
			t1 = data->GetInt(data->_ptr);
			t2 = data->GetInt(data->_ptr);
			t3 = data->GetInt(data->_ptr);
			mesh->SetTri(j, t1, t2, t3);
		}

		int diff = size - mesh->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			mesh->SetTag(tagTokens);
		}

		return mesh;
	}

	shared_ptr<Material> KRFBinaryParser::ParseMaterial(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Material> material = make_shared<Material>();

		int size = data->GetInt(data->_ptr);
		material->_type = data->GetShort(data->_ptr);
		material->_id = data->GetInt(data->_ptr);
		if (material->_id >= 0)
			material->_id += _baseID;

		int diff = size - material->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			material->SetTag(tagTokens);
		}

		return material;
	}

	shared_ptr<PointList> KRFBinaryParser::ParsePointList(shared_ptr<MemoryBlock> data)
	{
		double x, y, z;

		shared_ptr<PointList> pointlist = make_shared<PointList>();

		int size = data->GetInt(data->_ptr);
		pointlist->_type = data->GetShort(data->_ptr);
		pointlist->_id = data->GetInt(data->_ptr);
		if (pointlist->_id >= 0)
			pointlist->_id += _baseID;

		int numOfVertex = data->GetInt(data->_ptr);
		pointlist->Init(numOfVertex);
		for (int j = 0; j < numOfVertex; j++)
		{
			x = data->GetDouble(data->_ptr);
			y = data->GetDouble(data->_ptr);
			z = data->GetDouble(data->_ptr);

			pointlist->SetPoint(j, x, y, z);
		}

		int diff = size - pointlist->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			pointlist->SetTag(tagTokens);
		}

		return pointlist;
	}

	shared_ptr<PLine> KRFBinaryParser::ParsePLine(shared_ptr<MemoryBlock> data)
	{
		double x, y, z;

		shared_ptr<PLine> pline = make_shared<PLine>();


		int size = data->GetInt(data->_ptr);
		pline->_type = data->GetShort(data->_ptr);
		pline->_id = data->GetInt(data->_ptr);
		if (pline->_id >= 0)
			pline->_id += _baseID;

		int numOfVertex = data->GetInt(data->_ptr);
		pline->Init(numOfVertex);
		for (int j = 0; j < numOfVertex; j++)
		{
			x = data->GetDouble(data->_ptr);
			y = data->GetDouble(data->_ptr);
			z = data->GetDouble(data->_ptr);

			pline->SetPoint(j, x, y, z);
		}

		int diff = size - pline->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			pline->SetTag(tagTokens);
		}

		return pline;
	}

	shared_ptr<Polygon> KRFBinaryParser::ParsePolygon(shared_ptr<MemoryBlock> data)
	{
		double x, y, z;

		shared_ptr<Polygon> polygon = make_shared<Polygon>();

		int size = data->GetInt(data->_ptr);
		polygon->_type = data->GetShort(data->_ptr);
		polygon->_id = data->GetInt(data->_ptr);
		if (polygon->_id >= 0)
			polygon->_id += _baseID;
		
		int numOfVertex = data->GetInt(data->_ptr);
		polygon->Init(numOfVertex);

		for (int j = 0; j < numOfVertex; j++)
		{
			x = data->GetDouble(data->_ptr);
			y = data->GetDouble(data->_ptr);
			z = data->GetDouble(data->_ptr);

			polygon->SetPoint(j, x, y, z);
		}

		int diff = size - polygon->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			polygon->SetTag(tagTokens);
		}

		return polygon;
	}

	shared_ptr<Sphere> KRFBinaryParser::ParseSphere(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Sphere> sphere = make_shared<Sphere>();

		int size = data->GetInt(data->_ptr);
		sphere->_type = data->GetShort(data->_ptr);
		sphere->_id = data->GetInt(data->_ptr);
		if (sphere->_id >= 0)
			sphere->_id += _baseID;

		sphere->_center._x = data->GetDouble(data->_ptr);
		sphere->_center._y = data->GetDouble(data->_ptr);
		sphere->_center._z = data->GetDouble(data->_ptr);
		sphere->_radius = data->GetDouble(data->_ptr);

		int diff = size - sphere->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			sphere->SetTag(tagTokens);
		}

		return sphere;
	}

	shared_ptr<Spline> KRFBinaryParser::ParseSpline(shared_ptr<MemoryBlock> data)
	{
		double x, y, z;

		shared_ptr<Spline> spline = make_shared<Spline>();

		int size = data->GetInt(data->_ptr);
		spline->_type = data->GetShort(data->_ptr);
		spline->_id = data->GetInt(data->_ptr);
		if (spline->_id >= 0)
			spline->_id += _baseID;
		
		int numOfVertex = data->GetInt(data->_ptr);
		spline->Init(numOfVertex);
		for (int j = 0; j < numOfVertex; j++)
		{
			x = data->GetDouble(data->_ptr);
			y = data->GetDouble(data->_ptr);
			z = data->GetDouble(data->_ptr);

			spline->SetPoint(j, x, y, z);
		}

		int diff = size - spline->GetBinarySize();
		if (diff > 0)
		{
			int len = data->GetWordLen();

			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			spline->SetTag(tagTokens);
		}

		return spline;
	}

	shared_ptr<ProteinTrajectory> KRFBinaryParser::ParseProteinTrajectory(shared_ptr<MemoryBlock> data)
	{
		double x, y, z;
		char t;
		bool b;

		shared_ptr<ProteinTrajectory> proteinTrajectory = make_shared<ProteinTrajectory>();

		int size = data->GetInt(data->_ptr);
		proteinTrajectory->_type = data->GetShort(data->_ptr);
		proteinTrajectory->_id = data->GetInt(data->_ptr);
		if (proteinTrajectory->_id >= 0)
			proteinTrajectory->_id += _baseID;

		int num = data->GetInt(data->_ptr);
		proteinTrajectory->Init(num);
		for (int j = 0; j < num; j++)
		{
			x = data->GetDouble(data->_ptr);
			y = data->GetDouble(data->_ptr);
			z = data->GetDouble(data->_ptr);

			proteinTrajectory->SetPoint(j, x, y, z);
		}

		for (int j = 0; j < num; j++)
		{
			x = data->GetDouble(data->_ptr);
			y = data->GetDouble(data->_ptr);
			z = data->GetDouble(data->_ptr);

			proteinTrajectory->SetNormal(j, x, y, z);
		}

		for (int j = 0; j < num; j++)
		{
			t = data->GetChar(data->_ptr);

			proteinTrajectory->SetAminoType(j,t);
		}

		b = data->GetChar(data->_ptr);
		proteinTrajectory->_isDna = b;

		if (proteinTrajectory->_isDna) {
			proteinTrajectory->_dnaArm.resize(num);

			for (int i = 0; i < num; ++i) {
				int subArmSize = data->GetInt(data->_ptr);
				proteinTrajectory->_dnaArm[i].resize(subArmSize);
				for (int j = 0; j < subArmSize; ++j) {
					proteinTrajectory->_dnaArm[i].at(j) = data->GetInt(data->_ptr);
				}
			}
		}

		int diff = size - proteinTrajectory->GetBinarySize();
		if (diff > 0)
		{
			char* tagTokens = new char[diff];
			data->Read(data->_ptr, tagTokens, diff);
			proteinTrajectory->SetTag(tagTokens);
		}

		return proteinTrajectory;
	}

	
	shared_ptr<Dim> KRFBinaryParser::ParseDim(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<Dim> dim = make_shared<Dim>();

		int size = data->GetInt(data->_ptr);
		int type = data->GetShort(data->_ptr);	// type
		int len = data->GetInt(data->_ptr);	// msg len
		char* msg = (char*)(data->GetData(data->_ptr)); // msg
		data->_ptr += len + 1;
		string message(msg);
		std::cout << message << std::endl;
		dim->_message = message;
		
		Vector3 p1, p2, p3;
		p1._x = data->GetDouble(data->_ptr);
		p1._y = data->GetDouble(data->_ptr);
		p1._z = data->GetDouble(data->_ptr);

		p2._x = data->GetDouble(data->_ptr);
		p2._y = data->GetDouble(data->_ptr);
		p2._z = data->GetDouble(data->_ptr);

		p3._x = data->GetDouble(data->_ptr);
		p3._y = data->GetDouble(data->_ptr);
		p3._z = data->GetDouble(data->_ptr);

		dim->_p1 = p1;
		dim->_p2 = p2;
		dim->_p3 = p3;

		double radius, fontWidth, fontHeight, offset, angle;
		int refID, refType, dimType;

		radius = data->GetDouble(data->_ptr);
		fontWidth = data->GetDouble(data->_ptr);
		fontHeight = data->GetDouble(data->_ptr);
		offset = data->GetDouble(data->_ptr);
		angle = data->GetDouble(data->_ptr);

		dim->_radius = radius;
		dim->_fontWidth = fontWidth;
		dim->_fontHeight = fontHeight;
		dim->_offset = offset;
		dim->_angle = angle;

		refID = data->GetInt(data->_ptr);
		if(refID >= 0)
			refID += _baseID;
		refType = data->GetInt(data->_ptr);
		dimType = data->GetInt(data->_ptr);

		dim->_refID = refID;
		dim->_refType = refType;
		dim->_dimType = dimType;

		return dim;
	}

	shared_ptr<ExtraData> KRFBinaryParser::ParseExtraData(shared_ptr<MemoryBlock> data)
	{
		shared_ptr<ExtraData> extradata = make_shared<ExtraData>();

		int size = data->GetInt(data->_ptr);
		int type = data->GetShort(data->_ptr);
		int id = data->GetInt(data->_ptr);

		int wordLen = size - 10;
		if (wordLen > 0) {
			for (int i = 0; i < wordLen; ++i) {
				char ch = data->GetChar(data->_ptr);
				extradata->_data += ch;
			}
		}

		return extradata;
	}


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(KRFBinaryParser) {
		class_<RayCad::KRFBinaryParser>("KRFBinaryParser")
			.smart_ptr_constructor("KRFBinaryParser", &std::make_shared<KRFBinaryParser>)
			.function("GetLineCount", &RayCad::KRFBinaryParser::GetLineCount)
			.function("ReadFromLines", &RayCad::KRFBinaryParser::ReadFromLines)

			.function("AddBinaryToGeom", &RayCad::KRFBinaryParser::AddBinaryToGeom)

			.function("GetGeom", &RayCad::KRFBinaryParser::GetGeom)
			.function("GetGeoms", &RayCad::KRFBinaryParser::GetGeoms, allow_raw_pointers())
			.function("ParseLine", &RayCad::KRFBinaryParser::ParseLine, allow_raw_pointers())
			.function("ParsePoint", &RayCad::KRFBinaryParser::ParsePoint, allow_raw_pointers())

			.class_function("SetBaseID4Load", &RayCad::KRFBinaryParser::SetBaseID4Load)
			.class_function("GetBaseID", &RayCad::KRFBinaryParser::GetBaseID)
			;
	}
#endif

}

