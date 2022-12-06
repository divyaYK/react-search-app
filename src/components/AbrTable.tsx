import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/env";
import { EntityTypes, MainOrLegal, StateNames } from "../utils/Schema";
import { IAbr } from "../utils/types";
import Status from "./Status";

const HEADERS: readonly string[] = [
  "ABN",
  "ABN Status",
  "ENTITY CATEGORY",
  "ENTITY TYPE IND",
  "ENTITY TYPE",
  "ENTITY NAME",
  "ASIC",
  "ADDRESS",
  "GST STATUS",
  "DGR",
  "OTHER ENTITIES",
];

interface IFetchResponse {
  data: IAbr[];
  message: string;
  status: string;
}

const AbnTable = () => {
  const { data: response, error } = useFetch<IFetchResponse>({
    url: `${API_URL}/api/abr/actions/find`,
    options: { limit: 30, page: 0 },
  });
  console.log({ data: response?.data });
  return (
    <div className="section-wrapper">
      <div className="table-wrapper">
        {response !== undefined && response.data !== undefined ? (
          <table className="table-abn">
            <thead>
              <tr>
                {HEADERS.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {response.data.map((eachAbr) => (
                <tr key={eachAbr._id}>
                  <td>{eachAbr.abn?.value}</td>
                  <td className="status">
                    <Status
                      status={eachAbr.abn?.status}
                      date={eachAbr.abn?.statusFromDate}
                    />
                  </td>
                  <td className="entity-category">
                    {eachAbr.entity?.entityCategory}
                  </td>
                  <td className="entity-type">
                    {eachAbr.entityType?.entityTypeInd
                      ? EntityTypes[eachAbr.entityType?.entityTypeInd]
                      : ""}
                  </td>
                  <td className="entity-type">
                    {eachAbr.entityType?.entityTypeText}
                  </td>
                  <td>
                    {eachAbr.entity?.entityCategory === MainOrLegal.MAIN
                      ? eachAbr.entity.entityName?.nonIndividualName
                      : eachAbr.entity?.entityName?.givenName?.join(" ")}
                  </td>
                  <td>{eachAbr.asicNumber?.value}</td>
                  <td className="address">{`${
                    eachAbr.entity?.businessAddress?.state
                      ? StateNames[eachAbr.entity?.businessAddress?.state]
                      : "-"
                  } ${eachAbr.entity?.businessAddress?.postcode}`}</td>
                  <td className="status">
                    <Status
                      status={eachAbr.gst?.status}
                      date={eachAbr.gst?.statusFromDate}
                    />
                  </td>
                  <td>{`${eachAbr.dgr?.status} from ${
                    eachAbr.dgr?.statusFromDate
                      ? new Date(eachAbr.dgr?.statusFromDate).toDateString()
                      : "unknown date"
                  }`}</td>
                  <td className="other-entity">
                    {eachAbr.otherEntity !== undefined &&
                      eachAbr.otherEntity
                        .map((entity) => {
                          return `${entity.nameType}: ${entity.value}`;
                        })
                        .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default AbnTable;
