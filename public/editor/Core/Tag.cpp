#include "pch.h"


namespace RayCad {

	Tag::Tag() {


	}


	void Tag::Add(string key, string value) {
		_data.insert(pair<string, string>(key, value));
	}

	void Tag::Set(string data) {
		vector<string> token = Util::Split(data, ';');

		for (int i = 0; i < token.size(); i++) {
			vector<string> token2 = Util::Split(token[i], '=');
			if (token2.size() >= 2) {
				Add(token2[0], token2[1]);
			}
		}
	}


	shared_ptr<Tag> Tag::Clone() {
		auto cg = std::shared_ptr<Tag>(new Tag());
		return cg;

	}

	string Tag::ToString() {
		string ret = "";
		std::map<string, string>::iterator it;
		for (it = _data.begin(); it != _data.end(); ++it) {
			ret += it->first + "=" + it->second + ";";
		}
		return ret;
	}


}