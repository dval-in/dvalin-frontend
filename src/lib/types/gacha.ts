/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO: Test the convertor
export interface GachaRecord {
	info: UIGFInfo;
	list: UIGFItem[];

	[property: string]: any;
}

export interface UIGFInfo {
	exportApp?: string;
	exportAppVersion?: string;
	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	exportTime?: string;
	exportTimestamp?: number;
	lang?: string;
	regionTimeZone?: number;
	uid: string;
	uigfVersion: string;

	[property: string]: any;
}

export interface UIGFItem {
	count?: string;
	gachaType: string;
	id: string;
	itemID: string;
	itemType?: string;
	name?: string;
	rankType?: string;
	time: string;
	/**
	 * 用于区分卡池类型不同，但卡池保底计算相同的物品
	 * Used to differ between pools
	 */
	uigfGachaType: string;

	[property: string]: any;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class GachaRecordConvert {
	public static toGachaRecord(json: string): GachaRecord {
		return cast(JSON.parse(json), r('GachaRecord'));
	}

	public static gachaRecordToJson(value: GachaRecord): string {
		return JSON.stringify(uncast(value, r('GachaRecord')), null, 2);
	}
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
	const prettyTyp = prettyTypeName(typ);
	const parentText = parent ? ` on ${parent}` : '';
	const keyText = key ? ` for key "${key}"` : '';
	throw Error(
		`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`
	);
}

function prettyTypeName(typ: any): string {
	if (Array.isArray(typ)) {
		if (typ.length === 2 && typ[0] === undefined) {
			return `an optional ${prettyTypeName(typ[1])}`;
		} else {
			return `one of [${typ
				.map((a) => {
					return prettyTypeName(a);
				})
				.join(', ')}]`;
		}
	} else if (typeof typ === 'object' && typ.literal !== undefined) {
		return typ.literal;
	} else {
		return typeof typ;
	}
}

function jsonToJSProps(typ: any): any {
	if (typ.jsonToJS === undefined) {
		const map: any = {};
		typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
		typ.jsonToJS = map;
	}
	return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
	if (typ.jsToJSON === undefined) {
		const map: any = {};
		typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
		typ.jsToJSON = map;
	}
	return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
	function transformPrimitive(typ: string, val: any): any {
		if (typeof typ === typeof val) return val;
		return invalidValue(typ, val, key, parent);
	}

	function transformUnion(typs: any[], val: any): any {
		// val must validate against one typ in typs
		const l = typs.length;
		for (let i = 0; i < l; i++) {
			const typ = typs[i];
			try {
				return transform(val, typ, getProps);
			} catch (_) {}
		}
		return invalidValue(typs, val, key, parent);
	}

	function transformEnum(cases: string[], val: any): any {
		if (cases.indexOf(val) !== -1) return val;
		return invalidValue(
			cases.map((a) => {
				return l(a);
			}),
			val,
			key,
			parent
		);
	}

	function transformArray(typ: any, val: any): any {
		// val must be an array with no invalid elements
		if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent);
		return val.map((el) => transform(el, typ, getProps));
	}

	function transformDate(val: any): any {
		if (val === null) {
			return null;
		}
		const d = new Date(val);
		if (isNaN(d.valueOf())) {
			return invalidValue(l('Date'), val, key, parent);
		}
		return d;
	}

	function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
		if (val === null || typeof val !== 'object' || Array.isArray(val)) {
			return invalidValue(l(ref || 'object'), val, key, parent);
		}
		const result: any = {};
		Object.getOwnPropertyNames(props).forEach((key) => {
			const prop = props[key];
			const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
			result[prop.key] = transform(v, prop.typ, getProps, key, ref);
		});
		Object.getOwnPropertyNames(val).forEach((key) => {
			if (!Object.prototype.hasOwnProperty.call(props, key)) {
				result[key] = transform(val[key], additional, getProps, key, ref);
			}
		});
		return result;
	}

	if (typ === 'any') return val;
	if (typ === null) {
		if (val === null) return val;
		return invalidValue(typ, val, key, parent);
	}
	if (typ === false) return invalidValue(typ, val, key, parent);
	let ref: any = undefined;
	while (typeof typ === 'object' && typ.ref !== undefined) {
		ref = typ.ref;
		typ = typeMap[typ.ref];
	}
	if (Array.isArray(typ)) return transformEnum(typ, val);
	if (typeof typ === 'object') {
		return typ.hasOwnProperty('unionMembers')
			? transformUnion(typ.unionMembers, val)
			: typ.hasOwnProperty('arrayItems')
				? transformArray(typ.arrayItems, val)
				: typ.hasOwnProperty('props')
					? transformObject(getProps(typ), typ.additional, val)
					: invalidValue(typ, val, key, parent);
	}
	// Numbers can be parsed by Date but shouldn't be.
	if (typ === Date && typeof val !== 'number') return transformDate(val);
	return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
	return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
	return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
	return { literal: typ };
}

function a(typ: any) {
	return { arrayItems: typ };
}

function u(...typs: any[]) {
	return { unionMembers: typs };
}

function o(props: any[], additional: any) {
	return { props, additional };
}

function r(name: string) {
	return { ref: name };
}

const typeMap: any = {
	GachaRecord: o(
		[
			{ json: 'info', js: 'info', typ: r('UIGFInfo') },
			{ json: 'list', js: 'list', typ: a(r('UIGFItem')) }
		],
		'any'
	),
	UIGFInfo: o(
		[
			{ json: 'export_app', js: 'exportApp', typ: u(undefined, '') },
			{ json: 'export_app_version', js: 'exportAppVersion', typ: u(undefined, '') },
			{ json: 'export_time', js: 'exportTime', typ: u(undefined, '') },
			{ json: 'export_timestamp', js: 'exportTimestamp', typ: u(undefined, 3.14) },
			{ json: 'lang', js: 'lang', typ: u(undefined, '') },
			{ json: 'region_time_zone', js: 'regionTimeZone', typ: u(undefined, 3.14) },
			{ json: 'uid', js: 'uid', typ: '' },
			{ json: 'uigf_version', js: 'uigfVersion', typ: '' }
		],
		'any'
	),
	UIGFItem: o(
		[
			{ json: 'count', js: 'count', typ: u(undefined, '') },
			{ json: 'gacha_type', js: 'gachaType', typ: '' },
			{ json: 'id', js: 'id', typ: '' },
			{ json: 'item_id', js: 'itemID', typ: '' },
			{ json: 'item_type', js: 'itemType', typ: u(undefined, '') },
			{ json: 'name', js: 'name', typ: u(undefined, '') },
			{ json: 'rank_type', js: 'rankType', typ: u(undefined, '') },
			{ json: 'time', js: 'time', typ: '' },
			{ json: 'uigf_gacha_type', js: 'uigfGachaType', typ: '' }
		],
		'any'
	)
};
