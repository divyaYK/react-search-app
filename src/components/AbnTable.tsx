import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/env";
import { IAbr } from "../utils/types";

const HEADERS: readonly string[] = [
  "ABN",
  "ABN Status",
  "ENTITY",
  "ENTITY TYPE IND",
  "ENTITY TYPE",
  "ASIC",
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
    options: { limit: 20, page: 0 },
  });

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
                  <td>{`${eachAbr.abn?.status} from ${eachAbr.abn?.statusFromDate}`}</td>
                  <td>{eachAbr.entity?.entityCategory}</td>
                  <td>{eachAbr.entityType?.entityTypeInd}</td>
                  <td>{eachAbr.entityType?.entityTypeText}</td>
                  <td>{eachAbr.asicNumber?.value}</td>
                  <td>{JSON.stringify(eachAbr.otherEntity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="">Loading</div>
        )}
      </div>
    </div>
  );
};

export default AbnTable;
