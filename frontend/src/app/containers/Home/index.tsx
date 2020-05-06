import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Pie, Line, } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { AppRoutes } from "../../../config";

/* const brandPrimary = getStyle('--primary') */
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
//const brandDanger = getStyle('--danger')

//Random Numbers
function random(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(15000, 25000));
  data3.push(15000);
}

class HomeComponent extends Component<any, any> {
  render() {

    const mainChart = {
      labels: ['12-3-2019'],
      datasets: [
        {
          label: 'Total Amount',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [100],
        },
        {
          label: 'HogWork Amount',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [100],
        },
        {
          label: 'Refunded Amount',
          backgroundColor: 'transparent',
          borderColor: brandWarning,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          borderDash: [8, 5],
          data: [100],
        },
      ],
    };

    const mainChartOpts:any = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem:any, chart:any) {
            return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
          }
        }
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 25000,
            },
          }],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };

    const pie = {
      labels: [`Active`, `Inactive`],
      datasets: [
        {
          data: [2, 4],
          backgroundColor: [
            '#359ece',
            '#f55346'
            //'#36A2EB',
          ],
        }],
    };

    const vendorPie = {
      labels: [`Active`, `Inactive`],
      datasets: [
        {
          data: [2, 4],
          backgroundColor: [
            '#359ece',
            '#f55346',
          ],
        }],
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <Card.Header>
                <h4>
                  <i className="fa fa-dashboard" /> Dashboard
                </h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs="12" sm="6" lg="4">
                    <Card className="text-white" style={{background: "#d08f31"}}>
                      <Card.Body className="pb-0">
                        <div className="text-value">{4}<i className="fa fa-building pull-right"></i></div>
                        <div>Companies</div>
                      </Card.Body>
                      <div className="chart-wrapper mx-3" style={{ height: '50px' }}>
                        <div className={"view-link"} style={{ marginTop: '15px' }}
                          onClick={() => {
                            this.props.history.push(
                              AppRoutes.USER
                            );
                          }}
                        >View List</div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs="12" sm="6" lg="4">
                    <Card className="text-white" style={{background: "#48a36f"}}>
                      <Card.Body className="pb-0">
                        <div className="text-value">{3}<i className="fa fa-users pull-right"></i></div>
                        <div>Procurement Managers</div>
                      </Card.Body>
                      <div className="chart-wrapper mx-3" style={{ height: '50px' }}>
                        <div className={"view-link"} style={{ marginTop: '15px' }}
                          onClick={() => {
                            this.props.history.push(
                              AppRoutes.USER
                            );
                          }}>View List</div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs="12" sm="6" lg="4">
                    <Card className="text-white" style={{background: "#359ece"}}>
                      <Card.Body className="pb-0">
                        <div className="text-value">{5}<i className="fa fa-users pull-right"></i></div>
                        <div>Vendors</div>

                      </Card.Body>
                      <div className="chart-wrapper mx-3" style={{ height: '50px' }}>
                        <div className={"view-link"} style={{ marginTop: '15px' }}
                          onClick={() => {
                            this.props.history.push(
                              AppRoutes.USER
                            );
                          }}
                        >View List</div>
                      </div>
                    </Card>
                  </Col>

                  <Col sm={"6"}>
                    <Card>
                      <Card.Header>
                        <h4>
                          <i className="fa fa-users" /> Members
                        </h4>
                      </Card.Header>
                      <Card.Body>
                        <div className="chart-wrapper">
                          <Pie data={pie} options={{ legend: { display: true, position: "bottom" } }} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={"6"}>
                    <Card>
                      <Card.Header>
                        <h4>
                          <i className="fa fa-users" /> Vendors
                        </h4>
                      </Card.Header>
                      <Card.Body>
                        {vendorPie ?
                          <div className="chart-wrapper">
                            <Pie data={vendorPie} options={{ legend: { display: true, position: "bottom" } }} />
                          </div>
                          : <div> No Vendors found </div>}
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm="12">
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="5">
                            <Card.Title className="mb-0">Payment History</Card.Title>
                          </Col>
                        </Row>
                        <div className="chart-wrapper" style={{ marginTop: 40 + 'px' }}>
                          <Line data={mainChart} options={mainChartOpts} height={100} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomeComponent;
