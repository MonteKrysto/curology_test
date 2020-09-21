import { assign, Machine } from "xstate";

/**
 * This fetch machine is the basis for all HTTP CRUD requests.  Its
 * sole purpose is to provide the states for the requests.
 *
 * For each type of endpoint a service component can be created and passed
 * to the machine that handles all logic for that specific endpoint
 */
// The hierarchical (recursive) schema for the states
interface DataSchema {
  states: {
    idle: {};
    loading: {};
    updating: {};
    creating: {};
    deleting: {};
    success: {
      states: {
        unknown: {};
        withData: {};
        withoutData: {};
      };
    };
    failure: {};
  };
}

// The events that the machine handles
export type ResolveEvent = { type: "RESOLVE"; results: any[] };
export type RejectEvent = { type: "REJECT"; message: string };
export type FetchEvents =
  | { type: "FETCH"; endPoint: string }
  | ResolveEvent
  | RejectEvent;

type SuccessEvent = { type: "SUCCESS"; results: any[]; pageData: object };
type FailureEvent = { type: "FAILURE"; message: string };
export type DataEvents =
  | { type: "FETCH"; endPoint: string }
  | { type: "UPDATE"; endPoint: string; data?: any }
  | { type: "CREATE"; endPoint: string; data?: any }
  | { type: "DELETE"; endPoint: string; data?: any }
  | SuccessEvent
  | FailureEvent;

// The context (extended state) of the machine
export interface FetchContext {
  results?: any[];
  message?: string;
  endPoint?: string;
}
export interface DataContext {
  pageData?: object;
  results?: any[];
  message?: string;
  endPoint?: string;
}

export const fetchMachine = Machine<DataContext, DataSchema, DataEvents>(
  {
    id: "machineId",
    initial: "idle",
    context: {
      pageData: {},
      results: [],
      message: undefined,
    },
    states: {
      idle: {
        on: {
          FETCH: "loading",
          CREATE: "creating",
          UPDATE: "updating",
          DELETE: "deleting",
        },
      },
      loading: {
        entry: ["setEndpoint"],
        invoke: {
          src: "fetchData",
          onDone: { target: "success" },
          onError: { target: "failure", actions: "setMessage" },
        },
      },
      updating: {
        entry: ["setEndpoint"],
        invoke: {
          src: "updateData",
          onDone: { target: "idle" },
          onError: { target: "failure", actions: "setMessage" },
        },
      },
      creating: {
        invoke: {
          src: "createData",
          onDone: { target: "success" },
          onError: { target: "failure", actions: "setMessage" },
        },
      },
      deleting: {
        invoke: {
          src: "deleteData",
          onDone: { target: "idle" },
          onError: { target: "failure", actions: "setMessage" },
        },
      },
      success: {
        entry: ["setResults", "setPageData"],
        on: {
          FETCH: "loading",
          CREATE: "creating",
          UPDATE: "updating",
          DELETE: "deleting",
        },
        initial: "unknown",
        states: {
          unknown: {
            on: {
              "": [
                { target: "withData", cond: "hasData" },
                { target: "withoutData" },
              ],
            },
          },
          withData: {},
          withoutData: {},
        },
      },
      failure: {
        entry: ["setMessage"],
        on: {
          FETCH: "loading",
        },
      },
    },
  },
  {
    actions: {
      setResults: assign((ctx, event: any) => {
        return { results: event.data };
      }),
      setEndpoint: assign((ctx, event: any) => {
        return {
          endPoint: event.endPoint,
        };
      }),
      setPageData: assign((ctx: DataContext, event: any) => {
        return {
          pageData: event.data.pageData,
        }
      }),

      setMessage: /* istanbul ignore next */ assign((ctx, event: any) => ({
        message: event.message,
      })),
    },
    guards: {
      hasData: (ctx: DataContext, event) => {
        return !!ctx.results && ctx.results.length > 0;
      },
    },
  }
);
