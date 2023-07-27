export interface SubFareCategory {
	brandCode: string;
	price: {
		amount: number;
		currency: string;
	};
	order: number;
	status: string;
	rights: string[];
}

export interface Flight {
	originAirport: {
		name: string;
		code: string;
		city: {
			code: string;
			name: string;
		};
		country: {
			code: string;
			name: string;
		};
	};
	destinationAirport: {
		name: string;
		code: string;
		city: {
			code: string;
			name: string;
		};
		country: {
			code: string;
			name: string;
		};
	};
	arrivalDateTimeDisplay: string;
	departureDateTimeDisplay: string;
	flightDuration: string;
	fareCategories: {
		BUSINESS: { subcategories: SubFareCategory[] };
		ECONOMY: { subcategories: SubFareCategory[] };
	};
}

export interface Airport {
	id: string;
	title: string;
}

export type Page = "search" | "list" | "result";
