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