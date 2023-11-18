import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const Home = () => {

  const [itemList, setItemList] = useState([]);
  const currentDate = dayjs();
  const sevenDaysAgo = currentDate.add(7, 'day');
  const fifteenDaysAgo = currentDate.add(15, 'day');
  const thirtyDaysAgo = currentDate.add(30, 'day');



  const [itemStatus, setItemStatus] = useState([])
  const [calStatus, setCalStatus] = useState([])
  const itemFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
      );
      const allItems = response.data.result
      // You can use a different logic for generating the id
      const TotalItems = response.data.result.length

      setItemList(response.data.result);
      const activeItems = allItems.filter((item) => item.itemStatus === "Active").length;



      const pastDue = allItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
      const CurrentDue = allItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
      const sevenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
      const fifteenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
      const thirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
      const AboveThirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))

      setItemStatus([
        { id: 0, value: TotalItems, label: 'Total Item' },
        { id: 1, value: activeItems, label: 'Active' },
        { id: 2, value: TotalItems, label: 'Spare' },
        { id: 3, value: activeItems, label: 'BreakDown' },
        { id: 4, value: TotalItems, label: 'Missing' },
        { id: 5, value: activeItems, label: 'Rejection' }
      ])
      setCalStatus([
        { id: 0, value: pastDue.length, label: 'Past Due' },
        { id: 1, value: CurrentDue.length, label: 'Today' },
        { id: 2, value: sevenDaysFilter.length, label: '7 Days' },
        { id: 3, value: fifteenDaysFilter.length, label: '15 Days' },
        { id: 4, value: thirtyDaysFilter.length, label: '30 Days' },
        { id: 5, value: AboveThirtyDaysFilter.length, label: '>30 Days' }
      ])

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemFetch();
  }, []);

  console.log(itemStatus)



  return (
    <div style={{ backgroundColor: "#f1f4f4", width: "100%", height: "100%", margin: 0 }}>


      <div className="row" style={{ margin: "10px" }}>
        <Typography className='text-center' variant='h4'>DashBoard</Typography>
        <div className="col-md-5 ">
 
        </div>
        <div className="col-md-7 ">
          <div className="row ">

            <Paper className='col-md ' elevation={12} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <PieChart
                series={[
                  {
                    data: itemStatus,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 1,
                    cornerRadius: 0,
                    startAngle: -90,
                    endAngle: 360,
                    cx: 200

                  },
                ]}
                slotProps={{
                  legend: {
                    direction: 'column',
                    position: { vertical: 'middle', horizontal: 'left' },
                    padding: -20,
                  },
                }}
                width={200}
                height={200}
                sx={{ p: 0, m: 0 }}
              />
            </Paper>
            <Paper className='col-md ' elevation={12} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
              <PieChart
                series={[
                  {
                    data: calStatus,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 1,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 360,
                    cx: 200

                  },
                ]}
                onClick={(event, itemIdentifier, item) => console.log({ event: event, ItemIdentifies: itemIdentifier, Item: item })}
                width={200}
                height={200}
                slotProps={{
                  legend: {
                    direction: 'column',
                    position: { vertical: 'middle', horizontal: 'left' },
                    padding: -20,
                  },
                }}
              />
            </Paper>

          </div>
          
        </div>

      </div>


    </div>
  )
}

export default Home