import {
  client,
  connect,
  disconnect
} from '../Utils/client.js'

export class RequestService {
  async getAllRequests() {
    await connect()

    const requests = await client.Request.findMany({
      select: {
        id: true,
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
            lrn: true
          }
        },
        date_requested: true,
        date_updated: true,
      }
    })

    await disconnect()

    return requests
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
}