import {
  client,
  connect,
  disconnect
} from '../Utils/client.js'
import {generateDate} from "../Utils/date.js";

export class RequestService {
  async getAllRequests() {
    await connect()

    const allRequests = []

    const requests = await client.Request.findMany({
      select: {
        id: true,
        purpose: true,
        contact_number: true,
        status: {
          select: {
            id: true,
            status_name: true
          }
        },
        document_type: {
          select: {
            id: true,
            document_name: true
          }
        },
        student: {
          select: {
            full_name: true,
          }
        },
        date_requested: true,
        date_updated: true,
      },
      orderBy: {
        date_requested: 'desc'
      }
    })

    requests.forEach(request => {
      const requestObj = {
        id: request.id,
        purpose: request.purpose,
        contact: request.contact_number,
        status: request.status.id,
        document: request.document_type.document_name,
        name: request.student.full_name,
        dateRequested: request.date_requested,
        timeLog: request.date_updated
      }

      allRequests.push(requestObj)
    })

    await disconnect()

    return allRequests
  }

  async getRequestsByLRN(lrn) {
    await connect()

    const allRequests = []

    const requests = await client.Request.findMany({
      where: {
        lrn: lrn
      },
      select: {
        id: true,
        purpose: true,
        contact_number: true,
        status: {
          select: {
            id: true,
            status_name: true
          }
        },
        document_type: {
          select: {
            id: true,
            document_name: true
          }
        },
        date_requested: true,
        date_updated: true,
      },
      orderBy: {
        date_requested: 'desc'
      }
    })

    requests.forEach(request => {
      const requestObj = {
        id: request.id,
        purpose: request.purpose,
        contact: request.contact_number,
        status: request.status.id,
        document: request.document_type.document_name,
        dateRequested: request.date_requested,
        timeLog: request.date_updated
      }

      allRequests.push(requestObj)
    })

    await disconnect()

    return allRequests
  }

  async getCountByStatus() {
    await connect()

    const totalCounts = {
      onProcess: 0,
      forSignature: 0,
      forRelease: 0,
      toReceive: 0,
      claimed: 0,
      unclaimed: 0
    }

    const requests = await client.Request.groupBy({
      by: ['status_id'],
      orderBy: {
        status_id: 'asc'
      },
      _count: {
        status_id: true
      }
    })

    requests.forEach(request => {
      if (request.status_id === 1) {
        totalCounts['onProcess'] = request._count.status_id
      }
      if (request.status_id === 2) {
        totalCounts['forSignature'] = request._count.status_id
      }
      if (request.status_id === 3) {
        totalCounts['forRelease'] = request._count.status_id
      }
      if (request.status_id === 4) {
        totalCounts['toReceive'] = request._count.status_id
      }
      if (request.status_id === 5) {
        totalCounts['claimed'] = request._count.status_id
      }
      if (request.status_id === 6) {
        totalCounts['unclaimed'] = request._count.status_id
      }
    })

    await disconnect()

    return totalCounts
  }

  async getRequestsForDashboard() {
    await connect()

    const recentRequests = []

    const requests = await client.Request.findMany({
      select: {
        status: {
          select: {
            id: true,
            status_name: true
          }
        },
        document_type: {
          select: {
            id: true,
            document_name: true
          }
        },
        student: {
          select: {
            full_name: true,
          }
        },
        date_updated: true,
      },
      take: 5,
      orderBy: {
        date_updated: 'desc'
      }
    })

    requests.forEach(request => {
      const requestObj = {
        status: request.status.id,
        requestedDocument: request.document_type.document_name,
        requestor: request.student.full_name,
        date: request.date_updated
      }

      recentRequests.push(requestObj)
    })

    await disconnect()

    return recentRequests
  }

  async updateRequestStatus(id, status) {
    await connect()

    await client.Request.update({
      where: {
        id: id
      },
      data: {
        status_id: status,
        date_updated: new Date(generateDate())
      }
    })

    await disconnect()
  }

  async createRequest(purpose, contact, document, lrn) {
    await connect()

    await client.Request.create({
      data: {
        purpose: purpose,
        contact_number: contact,
        lrn: lrn,
        document_requested: document,
        status_id: 1,
        date_requested: new Date(generateDate()),
        date_updated: new Date(generateDate())
      }
    })

    await disconnect()
  }
}