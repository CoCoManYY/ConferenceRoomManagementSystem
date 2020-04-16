import React from 'react';
import { Card, Col, Icon, Row } from 'antd';
import BreadcrumbCustom from "../common/BreadcrumbCustom";
import CountUp from 'react-countup';

const { Meta } = Card;

//TODO: change to your city code according to http://www.weather.com.cn/
const cityCode = 101010100;

class MIndex extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            city: null,
            weather: null
        };
    }

    componentDidMount() {
        // const apiUrl = `data/cityinfo/${cityCode}.html`;
        const apiUrl = `/s6/weather/now?key=2ed7a7d1ad454d958403beae02962538&location=天津`;
        const opts = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        fetch(apiUrl, opts).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                this.setState({
                    city: responseJson.HeWeather6[0].basic.location,
                    weather: responseJson.HeWeather6[0].now
                });
                console.log(this.state.weather);
            }).catch((error) => {
                this.setState({city: '',weather: null});
            });
        }).catch((error) => {
            this.setState({city: '',weather: null});
        });
    }

    CountUp(){
        let imgSrc = ["mail","chat","cart","heart"];
        let imgName = ["Account","Department","Employee","Position"];
        let count = ["1379","768","192","413"];
        let cu = imgSrc.map(function(item,index){
            return(
                <Col md={6} key={item}>
                    <Card style={{cursor:'pointer', marginBottom:16}}
                          actions={[<Icon type="info-circle-o" />, <Icon type="ellipsis" />]}>
                        <Meta
                            style={{fontSize:22}}
                            avatar={<img src={require('../../style/img/'+item+'.png')} alt=""/>}
                            title={imgName[index]}
                            description={<CountUp start={0} end={count[index]} duration={2.75}/>}
                        />
                    </Card>
                </Col>
            )
        });
        return cu;
    }

    render() {

        if (!this.state.weather) {
            return <div>no data</div>;
        }

        return (
            <div>
                <BreadcrumbCustom paths={['index','form']}/>
                <div className='mindex'>

                    <Row gutter={16}>
                        <Col md={18}>
                            <Card style={{marginBootom:16}} title='welcome'>
                                <Meta
                                    style={{fontSize:22}}
                                    title='User:'
                                />
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card style={{marginBootom:16}} title={this.state.city}>
                                <img src={require('../../style/img/cond-icon/' + this.state.weather.cond_code +'.png' )} alt=""/>
                                {/*<img src={require('../../style/img/' + this.state.weather.img2)} alt=""/>*/}

                                <div style={{marginLeft: 42}}>
                                    {this.state.weather.cond_txt}
                                </div>
                                <div style={{marginLeft: 20}}>
                                    tmp: {this.state.weather.tmp} ℃
                                </div>
                                <div style={{marginLeft: 20}}>
                                    hum: {this.state.weather.hum}
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        {this.CountUp()}
                    </Row>
                </div>
            </div>


        )
    }
}

export default MIndex;