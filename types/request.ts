import type { Id, Params } from "./common.ts";

/**
 * Representing a potential valid JSON-RPC 2.0 request object.
 */
export type RequestCandidate = {
  jsonrpc?: "2.0";
  method?: string;
  params?: Params;
  id?: Id;
};

/**
 * A rpc call is represented by sending a Request object to a Server.
 */
export type Request<P extends Params | void = void> = {
  /**
   * A String specifying the version of the JSON-RPC protocol. MUST be exactly "2.0".
   */
  jsonrpc: "2.0";

  /**
   * A String containing the name of the method to be invoked. Method names that begin
   * with the word rpc followed by a period character (U+002E or ASCII 46) are reserved
   * for rpc-internal methods and extensions and MUST NOT be used for anything else.
   */
  method: string;

  /**
   * A Structured value that holds the parameter values to be used during the invocation
   * of the method. This member MAY be omitted.
   *
   * If present, parameters for the rpc call MUST be provided as a Structured value.
   * Either by-position through an Array or by-name through an Object.
   *
   *  - by-position: params MUST be an Array, containing the values in the Server
   *    expected order.
   *
   *  - by-name: params MUST be an Object, with member names that match the Server
   *    expected parameter names. The absence of expected names MAY result in an error
   *    being generated. The names MUST match exactly, including case, to the method's
   *    expected parameters.
   */
  params?: P;

  /**
   * An identifier established by the Client that MUST contain a String, Number, or NULL
   * value if included. If it is not included it is assumed to be a notification. The
   * value SHOULD normally not be Null [1] and Numbers SHOULD NOT contain fractional
   * parts [2].
   *
   * [1] The use of Null as a value for the id member in a Request object is discouraged,
   * because this specification uses a value of Null for Responses with an unknown id.
   * Also, because JSON-RPC 1.0 uses an id value of Null for Notifications this could
   * cause confusion in handling.
   *
   * [2] Fractional parts may be problematic, since many decimal fractions cannot be
   * represented exactly as binary fractions.
   */
  id: Id;
};
