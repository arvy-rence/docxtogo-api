import {RequestService} from "./requests.service.js";

const requestService = new RequestService();

export const getAllRequests = async (req, res) => {
  const requests = await requestService.getAllRequests()

  res.status(200).json({
    requests
  })
}

export const getCountByStatus = async (req, res) => {
  const requests = await requestService.getCountByStatus()

  res.status(200).json({
    requests
  })
}

export const getRequestsForDashboard = async (req, res) => {
  const requests = await requestService.getRequestsForDashboard()

  res.status(200).json({
    requests
  })
}

export const getRequestsByLRN = async (req, res) => {
  const lrn = req.params.lrn

  const requests = await requestService.getRequestsByLRN(lrn)

  res.status(200).json({
    requests
  })
}

export const updateRequestStatus = async (req, res) => {
  const id = parseInt(req.params.id)

  const {status} = req.body

  await requestService.updateRequestStatus(id, status)

  res.status(200).json({
    message: "Updated request status successfully"
  })
}

export const createRequest = async (req, res) => {
  const {purpose, contact, document, lrn} = req.body

  const request = await requestService.createRequest(purpose, contact, document, lrn)

  res.status(200).json({
    message: "Created request successfully",
    request
  })
}