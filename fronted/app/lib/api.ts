import { ApiClient } from "@/app/lib/client"
import { MODEL_DEFAULT } from "@/app/lib/config"
import {
  API_ROUTE_CREATE_CHAT,
  API_ROUTE_CREATE_GUEST,
  API_ROUTE_MCP_SEARCH,
  API_ROUTE_MCP_SERVER_CALL,
  API_ROUTE_MCP_SERVER_DETAIL,
  API_ROUTE_MCP_SERVER_FEED,
  API_ROUTE_OAUTH_USER,
  API_ROUTE_OAUTH2_LOGIN,
  API_ROUTE_UPDATE_CHAT_MODEL,
} from "./routes"

/**
 * Creates a new chat for the specified user
 */
export async function createNewChat(
  userId: string,
  title?: string,
  model?: string,
  isAuthenticated?: boolean,
  systemPrompt?: string
) {
  try {
    const res = await fetch(API_ROUTE_CREATE_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        title,
        model: model || MODEL_DEFAULT,
        isAuthenticated,
        systemPrompt,
      }),
    })
    const responseData = await res.json()

    if (!res.ok) {
      throw new Error(
        responseData.error ||
          `Failed to create chat: ${res.status} ${res.statusText}`
      )
    }

    return responseData.chatId
  } catch (error) {
    console.error("Error creating new chat:", error)
    throw error
  }
}

/**
 * Creates a guest user record on the server
 */
export async function createGuestUser(guestId: string) {
  try {
    const res = await fetch(API_ROUTE_CREATE_GUEST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: guestId }),
    })
    const responseData = await res.json()
    if (!res.ok) {
      throw new Error(
        responseData.error ||
          `Failed to create guest user: ${res.status} ${res.statusText}`
      )
    }

    return responseData
  } catch (err) {
    console.error("Error creating guest user:", err)
    throw err
  }
}

export class UsageLimitError extends Error {
  code: string

  constructor(message: string) {
    super(message)
    this.code = "DAILY_LIMIT_REACHED"
  }
}

/**
 * Checks the user's daily usage and increments both overall and daily counters.
 * Resets the daily counter if a new day (UTC) is detected.
 * Uses the `anonymous` flag from the user record to decide which daily limit applies.
 *
 * @param supabase - Your Supabase client.
 * @param userId - The ID of the user.
 * @returns The remaining daily limit.
 */
export async function checkRateLimits(
  userId: string,
  isAuthenticated: boolean
) {
  try {
    const res = await fetch(
      `/api/rate-limits?userId=${userId}&isAuthenticated=${isAuthenticated}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
    const responseData = await res.json()
    if (!res.ok) {
      throw new Error(
        responseData.error ||
          `Failed to check rate limits: ${res.status} ${res.statusText}`
      )
    }
    return responseData
  } catch (err) {
    console.error("Error checking rate limits:", err)
    throw err
  }
}

/**
 * Updates the model for an existing chat
 */
export async function updateChatModel(chatId: string, model: string) {
  try {
    const res = await fetch(API_ROUTE_UPDATE_CHAT_MODEL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, model }),
    })
    const responseData = await res.json()

    if (!res.ok) {
      throw new Error(
        responseData.error ||
          `Failed to update chat model: ${res.status} ${res.statusText}`
      )
    }

    return responseData
  } catch (error) {
    console.error("Error updating chat model:", error)
    throw error
  }
}

/**
 * Signs in user with Github OAuth
 * @returns The GitHub OAuth URL to redirect the user to
 */
export async function signInWithGithub() {
  try {
    // Send GET request to the GitHub OAuth endpoint
    const response = await ApiClient.get<{
      code: number
      msg: string
      data: string
    }>(API_ROUTE_OAUTH2_LOGIN)

    // Check if the request was successful
    if (response.code !== 200) {
      throw new Error(`Failed to get GitHub OAuth URL: ${response.msg}`)
    }

    // Return the GitHub OAuth URL from the response
    return {
      url: response.data,
    }
  } catch (err) {
    console.error("Error signing in with Github:", err)
    throw err
  }
}

/**
 * MCP Search API response interface
 */
export interface McpSearchResponse {
  code: number
  msg: string
  data: {
    items: McpServerItem[]
    total: number
    page: number
    size: number
    total_pages: number
    links: {
      first: string
      last: string
      self: string
      next: string | null
      prev: string | null
    }
  }
}

/**
 * MCP Server item interface
 */
export interface McpServerItem {
  id: Number
  title: string
  description: string
  server_type?: "hosted" | "local"
  mcp_endpoint?: string
  envs?: Record<string, string>
  capabilities: {
    meta: any
    protocolVersion: string
    capabilities: {
      experimental: Record<string, any>
      logging: any
      prompts: any
      resources: any
      tools: {
        listChanged: boolean
      }
    }
    serverInfo: {
      name: string
      version: string
    }
    instructions: any
  }
  tools?: {
    meta: any
    nextCursor: any
    tools: Array<{
      name: string
      description: string
      inputSchema: Record<string, any>
    }>
  }
  prompts?: any
  resources?: any
  created_time?: string
  updated_time?: string
  user?: {
    username: string
  }
}

/**
 * MCP Server detail response interface
 */
export interface McpServerDetailResponse {
  code: number
  msg: string
  data: McpServerItem
}

/**
 * MCP Search parameters interface
 */
export interface McpSearchParams {
  page?: number
  size?: number
  category_id?: number
  keyword?: string
}

/**
 * Searches for MCP servers
 *
 * @param params - Search parameters
 * @returns MCP search results
 */
export async function searchMcpServers(
  params: McpSearchParams = {}
): Promise<McpSearchResponse> {
  try {
    // Set default values for pagination if not provided
    const searchParams: McpSearchParams = {
      page: params.page || 1,
      size: params.size || 10,
      category_id: params.category_id !== undefined ? params.category_id : 0,
      keyword: params.keyword || "",
    }

    // Make GET request to MCP search API
    const response = await ApiClient.post<McpSearchResponse>(
      API_ROUTE_MCP_SEARCH,
      searchParams
    )

    return response
  } catch (error) {
    console.error("Error searching MCP servers:", error)
    throw error
  }
}

/**
 * MCP Feed response interface
 */
export interface McpFeedResponse {
  code: number
  msg: string
  data: McpServerItem[]
}

/**
 * Gets the feed of MCP servers
 *
 * @returns MCP feed results
 */
export async function getMcpServerFeed(): Promise<McpFeedResponse> {
  try {
    const response = await ApiClient.get<McpFeedResponse>(
      API_ROUTE_MCP_SERVER_FEED
    )
    return response
  } catch (error) {
    console.error("Error getting MCP server feed:", error)
    throw error
  }
}

/**
 * Gets details for a specific MCP server
 *
 * @param serverId - The ID of the MCP server
 * @returns MCP server details
 */
export async function getMcpServerDetail(
  serverId: string | number
): Promise<McpServerDetailResponse> {
  try {
    const url = `${API_ROUTE_MCP_SERVER_DETAIL}/${serverId}`
    const response = await ApiClient.get<McpServerDetailResponse>(url)
    return response
  } catch (error) {
    console.error(`Error getting MCP server details for ID ${serverId}:`, error)
    throw error
  }
}

/**
 * MCP Server call response interface
 */
export interface McpServerCallResponse {
  code: number
  msg: string
  data: {
    _meta: any
    content: Array<{
      type: string
      text: string
      annotations?: any
    }>
    isError: boolean
  }
}

/**
 * Calls a tool on a specific MCP server
 *
 * @param mcpId - The ID of the MCP server
 * @param toolName - The name of the tool to call
 * @param arguments - The arguments to pass to the tool
 * @returns The result of the tool call
 */
export async function callMcpServerTool(
  mcpId: string | number,
  toolName: string,
  args: Record<string, any>
): Promise<McpServerCallResponse> {
  try {
    const url = `${API_ROUTE_MCP_SERVER_CALL}/${mcpId}`
    const body = {
      tool_name: toolName,
      arguments: args,
    }
    const response = await ApiClient.post<McpServerCallResponse>(url, body)
    return response
  } catch (error) {
    console.error(
      `Error calling MCP server tool ${toolName} on server ${mcpId}:`,
      error
    )
    throw error
  }
}

export interface UserItem {
  nickname: string
  avatar: string
}

export interface GetCurrentUserResponse {
  code: number
  msg: string
  data: UserItem
}

export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
  try {
    const response =
      await ApiClient.get<GetCurrentUserResponse>(API_ROUTE_OAUTH_USER)
    return response
  } catch (error) {
    console.error("Error getting current user:", error)
    throw error
  }
}
