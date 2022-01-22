export interface GeoType {
  asset_pnu: string;
  assetOverviewMulti: AssetOverviewMulti;
  assetHistory: AssetHistory;
  assetSimilarDealsLand: AssetSimilarDealsLand;
  assetSimilarDealsBuilding: string;
  assetSimilarDealsAccommodation: string;
  assetCollectionUnitsData: string;
  assetAreaDist: AssetAreaDist;
  assetAreaDistMulti: AssetAreaDistMulti[];
  centerPoint: CenterPoint;
  defaultMapAssetClicked: DefaultMapAssetClicked;
  hasAccommodationExceededMajority: boolean;
  myBookmarksInAsset: null;
  assetLogistic: AssetLogistic;
}

export interface AssetAreaDist {
  옥탑: { [key: string]: 옥탑 };
  지상: { [key: string]: { [key: string]: number } };
  지하: { [key: string]: { [key: string]: number } };
}

export interface 옥탑 {
  "기계·전기실": number;
}

export interface AssetAreaDistMulti {
  "11680-14961": AssetAreaDist;
  _bpk: string;
  _groundFloorArea: number;
  _buildingName: string;
  _areaDist: AssetAreaDist;
  _dongName: null;
  _mainUse: string;
}

export interface AssetHistory {
  buildingHistory: BuildingHistory;
  dealsHistoryWithResearch: DealsHistory;
  dealsHistory: DealsHistory;
}

export interface BuildingHistory {
  permitDate: string;
  constructionDate: string;
  approvalDate: string;
  constructionDuration: number;
}

export interface DealsHistory {
  unit: any[];
  whole: any[];
}

export interface AssetLogistic {
  data: Data;
  status: string;
}

export interface Data {}

export interface AssetOverviewMulti {
  landsData: LandsData;
  landsDataArr: LandsDataArr[];
  landuseArea: LanduseArea;
  buildingData: BuildingData;
  buildingDataArr: BuildingData[];
  assetName: string;
  assetAddress: string;
  assetAddressObject: AssetAddressObject;
  assetValue: AssetValue;
  developmentType: string;
  roadNameAddress: string;
  totalGroundFloorArea: number;
}

export interface AssetAddressObject {
  sido: string;
  sgg: string;
  emd: string;
  ji: string;
  originalSido: string;
  originalSgg: string;
}

export interface AssetValue {
  estimateLandValue: number;
  publicPricePoint: string;
  assetLandArea: number;
  valuationPoint: string;
  model: string;
  estimatePrice: number;
  referenceModel: string;
}

export interface BuildingData {
  groundFloorArea: number;
  floorAreaForFloorAreaRatioCalculation: number;
  buildingCoverageArea: number;
  mainUsage: string;
  structureMain: string;
  structureRoof: string;
  floorCounts: FloorCounts;
  ratioFloorAreaNow: number;
  isRatioFloorAreaNowEstimate: boolean;
  ratioBuildingCoverageNow: number;
  isRatioBuildingCoverageNowEstimate: boolean;
  own: string;
  elevatorCounts: ElevatorCounts;
  parkingLotCounts: ParkingLotCounts;
  approvalDate: string;
  _bldName: string;
  _bpk: string;
  _dongName: null;
  price_reproduction: number;
  price_depreciated: number;
  assetBuildingsTotalData: AssetBuildingsTotalData;
}

export interface AssetBuildingsTotalData {
  totalRatioFloorAreaNow: TotalRatioNow;
  totalRatioBuildingCoverageNow: TotalRatioNow;
}

export interface TotalRatioNow {
  rt: number;
  isEstimate: boolean;
}

export interface ElevatorCounts {
  user: number;
  emergency: number;
}

export interface FloorCounts {
  onGround: number;
  underGround: number;
}

export interface ParkingLotCounts {
  totalAuto: number;
  totalSelf: number;
}

export interface LandsData {
  restrictions: string;
  jimok: string;
  ratioFloorAreaCapacity: number;
  ratioBuildingCoverageCapacity: number;
  assetLandArea: number;
}

export interface LandsDataArr {
  pnu: string;
  landArea: number;
  restrictions: string;
  jimok: string;
  ratioFloorAreaCapacity: number;
  ratioBuildingCoverageCapacity: number;
  publicPrice: number;
  eupmyundong: string;
  jibun: string;
}

export interface LanduseArea {
  제3종일반주거지역: number;
}

export interface AssetSimilarDealsLand {
  simple: Simple[];
  details: Detail[];
}

export interface Detail {
  assetLocation: AssetLocation;
  dealInformation: DealInformation;
  buildingDetail?: BuildingDetail;
  landsDetail: LandsDetail;
}

export interface AssetLocation {
  type: string;
  coordinates: number[];
}

export interface BuildingDetail {
  buildingName: string;
  approvalYear: string;
  ratioFloorAreaNow: number;
  groundFloorArea: number;
  floorCounts: FloorCounts;
  elevatorCounts: number;
  parkingLotCounts: ParkingLotCounts;
  mainUsage: string;
}

export interface DealInformation {
  distance: number;
  pnu: string;
  score: number;
  date: string;
  dealPrice: number;
  landuse: string;
  unitLandArea: null;
  numberOfDeals: number;
  dealAreaLand: number;
  unitPriceBuildingArea?: number;
  unitPriceLandArea: number;
}

export interface LandsDetail {
  distance: number;
  landuse: string;
  ratioFloorAreaCapacity: number;
  jibun: string;
  landArea: number;
}

export interface Simple {
  address: string;
  date: string;
  unitPriceLandArea: number;
  score: number;
  numberOfDeals: number;
}

export interface CenterPoint {
  streetViewTarget: StreetViewTarget;
}

export interface StreetViewTarget {
  x: number;
  y: number;
}

export interface DefaultMapAssetClicked {
  type: string;
  features: Feature[];
}

export interface Feature {
  geometry: Geometry;
  properties: Properties;
  type: string;
}

export interface Geometry {
  type: string;
  coordinates: Array<Array<number[]> | number>;
}

export interface Properties {
  asset: boolean;
  asset_area: number;
  asset_pnu: string;
  bld_name: string;
  brand: boolean;
  brand_text_name: null;
  image_file_name: string;
  deals_history: any[];
  estimate_price: number;
  id: string;
  is_collection_units: boolean;
  jibun: AssetAddressObject;
  jimok: string;
  pnus: string[];
  similar_deals_building: any[];
  similar_deals_land: string[];
  similar_deals_accommodation: any[];
  deal_price_per_square_meter: string;
  reference_model: string;
  center_point: AssetLocation;
}
