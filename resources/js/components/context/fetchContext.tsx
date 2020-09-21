import React from "react";
import { useMachine } from "@xstate/react";
import { fetchMachine, DataEvents } from "../machines/fetchMachine";
import { omit } from "lodash/fp";

type Fetch = DataEvents;
type Dispatch = (action: Fetch) => void;
type State = { fetchState: any; results: any };
type FetchProviderProps = { children: React.ReactNode };

const FetchStateContext = React.createContext<State | undefined>(undefined);
const FetchDispatchContext = React.createContext<Dispatch | undefined>(
    undefined
);

const BASE_URL = "http://localhost:3000";
const MAGIC_ENDPOINT = "api/magic";

/**
 * This is the context provider that provides functionality and
 * accessibility to the fetchStateMachine.
 *
 * It provides the ability to perform CRUD operations that the machine
 * manages
 */

function FetchProvider({ children }: FetchProviderProps) {
    const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
        services: {
            fetchData: async (ctx: any, event: any) => {
                const resp = await fetch(`${BASE_URL}/${event.endPoint}`);
                const result = await resp.json();

                return result;
            },
            updateData: async (ctx, event: any) => {
                const payload = omit(["endPoint", "type"]);
                const resp = await fetch(`${BASE_URL}/${event.endPoint}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...payload })
                });
                return resp;
            },
            createData: async (ctx, event: any) => {
                const payload = omit(["endPoint", "type"], event);

                const resp = await fetch(`${BASE_URL}/${event.endPoint}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...payload })
                });
                const data = await resp.json();

                return { status: resp.status, data };
            },
            deleteData: async (ctx, event: any) => {
                const resp = await fetch(`${BASE_URL}/${event.endPoint}`, {
                    method: "DELETE"
                });
                return resp;
            }
        }
    });
    const {
        context: { results }
    } = fetchState;

    return (
        <FetchStateContext.Provider value={{ fetchState, results }}>
            <FetchDispatchContext.Provider value={sendToFetchMachine}>
                {children}
            </FetchDispatchContext.Provider>
        </FetchStateContext.Provider>
    );
}
const useFetchState = () => {
    const context = React.useContext(FetchStateContext);

    if (context === undefined) {
        throw new Error("useFetchState must be used within a FetchProvider");
    }

    return context;
};

const useSendToMachine = () => {
    const context = React.useContext(FetchDispatchContext);
    const sendToFetchMachine = React.useContext(FetchDispatchContext);

    if (context === undefined) {
        throw new Error("useSendToMachine must be used within a FetchProvider");
    }
    const createNew = (data, endPoint = MAGIC_ENDPOINT) => {
        sendToFetchMachine({ type: "CREATE", endPoint, ...data });
    };
    const getData = endpoint => {
        context({ type: "FETCH", endPoint: endpoint });
    };

    const deleteData = (data, endPoint) => {
        context({ type: "DELETE", endPoint, data });
    };

    const updateData = (data, endPoint) => {
        context({ type: "UPDATE", endPoint, data });
    };
    return { context, getData, createNew, deleteData, updateData };
};
export { FetchProvider, useFetchState, useSendToMachine };
