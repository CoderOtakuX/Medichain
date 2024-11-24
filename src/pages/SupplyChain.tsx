import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../contexts/Web3Context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SupplyChain() {
  const { contract } = useWeb3()
  const [batchNumber, setBatchNumber] = useState('')
  const [medicineDetails, setMedicineDetails] = useState(null)

  const fetchMedicineDetails = async () => {
    if (contract && batchNumber) {
      try {
        const details = await contract.methods.getMedicineDetails(batchNumber).call()
        setMedicineDetails({
          name: details
.name,
          manufacturer: details.manufacturer,
          manufactureDate: new Date(details.manufactureDate * 1000),
          expiryDate: new Date(details.expiryDate * 1000),
          isVerified: details.isVerified
        })
      } catch (error) {
        console.error('Error fetching medicine details:', error)
        setMedicineDetails(null)
      }
    }
  }

  const supplyChainData = medicineDetails ? [
    { id: 1, stage: 'Manufacturing', location: medicineDetails.manufacturer, date: medicineDetails.manufactureDate.toLocaleDateString() },
    { id: 2, stage: 'Quality Control', location: `${medicineDetails.manufacturer} Lab`, date: new Date(medicineDetails.manufactureDate.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString() },
    { id: 3, stage: 'Distribution Center', location: 'MediDist', date: new Date(medicineDetails.manufactureDate.getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString() },
    { id: 4, stage: 'Wholesaler', location: 'MedSupply', date: new Date(medicineDetails.manufactureDate.getTime() + 25 * 24 * 60 * 60 * 1000).toLocaleDateString() },
    { id: 5, stage: 'Pharmacy', location: 'HealthPlus', date: new Date(medicineDetails.manufactureDate.getTime() + 35 * 24 * 60 * 60 * 1000).toLocaleDateString() },
  ] : []

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Medicine Supply Chain</CardTitle>
          <CardDescription>Track the journey of your medicine from manufacturer to pharmacy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <Input
              type="text"
              placeholder="Enter Batch Number"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
            />
            <Button onClick={fetchMedicineDetails}>Fetch Details</Button>
          </div>
          {medicineDetails ? (
            <Timeline position="alternate">
              {supplyChainData.map((item, index) => (
                <TimelineItem key={item.id}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {index !== supplyChainData.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Card>
                      <CardContent>
                        <h3 className="font-semibold">{item.stage}</h3>
                        <p>{item.location}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </CardContent>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          ) : (
            <p>Enter a batch number and click "Fetch Details" to view the supply chain.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

