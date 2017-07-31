var React = require('react');
var Request = require('../request/Request.js');
var axios = require('axios');

class Approver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: 'eddyG', pas: 'earl',
            user:      this.props.state.user,
            filters:  {
                status: {
                    current: 'ALL0',
                        options: []
                },
                property: {
                    current: 'ALL1',
                        options: []
                },
                approver: {
                    current: 'eddyG',
                        options: []
                },
                period: {
                    current: 'ALL3',
                        options: []
                }
            },
            requests: [
                {
                    requestId: 1107, requestName: 'HVAC',
                    requesterName: 'John Liberty', requesterId: 17,
                    nextApproverName: 'Hannah Valentine', nextApproverId: 13,
                    status: 'In Process', amount: 1900.00,
                    propertyName: 'Signature Place', propertyId: 103,
                    unitName: '81-081', itemType: 'Financial',
                    requestorComment: '', createDate: '', lastEditDate: '',
                    attributes: [
                        ['Price', '2524'], ['Shipping', '0'],
                        ['Tax', '0'], ['OtherCost', '0']
                    ],
                    comments: [
                        ['Date, text, user']
                    ]
                },
                {
                    requestId: 1108, requestName: 'Washing Machine',
                    requesterName: 'Maverick Jones', requesterId: 6,
                    nextApproverName: 'Donna Tijuana', nextApproverId: 3,
                    status: 'Approved', amount: 700.00,
                    propertyName: 'A Rundown Trailer', propertyId: 111703,
                    unitName: 'A3', itemType: 'Residential',
                    requestorComment: '', createDate: '', lastEditDate: '',
                    attributes: [
                        ['Price', '2524'], ['Shipping', '0'],
                        ['Tax', '0'], ['OtherCost', '0']
                    ],
                    comments: [
                        ['Date, text, user']
                    ]
                }
            ]
        };
        this.loadRequests = this.loadRequests.bind(this);
    }

    componentWillMount() {
        this.loadRequests();
    }

    loadRequests() {
        console.log('Load Request started');
        var paramString = '';
        console.log('Load Request started');
        paramString +=  this.props.state.filters.status.current + '/';
        console.log('Load Request started');
        paramString +=  this.props.state.filters.property.current+ '/';
        console.log('Load Request started');
        paramString +=  this.props.state.filters.approver.current+ '/';
        console.log('Load Request started');
        paramString +=  this.props.state.filters.period.current;
        console.log('Requesting:  ', 'https://standardrequests.com/api/requests/' + paramString);
        axios.get('https://standardrequests.com/api/requests/' + paramString, {
            auth: {
                username: this.state.usr,
                password: this.state.pas
            }
        }).then(function(res){
            console.log('axios request worked', res);
            console.log(res);
        }).catch(function(err){
            console.log('Getting Requests Went Wrong');
            console.log(err);
        });
        console.log('Load Request Ended');
    }

    render() {
        console.log('Rendering Approver', this.state);
        return (
            <div className='ApproverContainer'>
                <div className='FilterContainer'>
                    <h1> Filter Container </h1>
                </div>
                <div className='ListContainer'>
                    {this.state.requests.map( request =>
                        <Request
                            state={request}
                            key={request.requestId}
                        />
                    )}
                </div>

            </div>
        )
    }
}

module.exports = Approver;