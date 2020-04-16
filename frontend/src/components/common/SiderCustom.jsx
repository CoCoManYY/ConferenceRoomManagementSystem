import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderCustom extends Component{
    constructor(props){
        super(props);
        const { collapsed }= props;
        this.state = {
            collapsed: collapsed,
            firstHide: true,
            selectedKey: '',
            openKey: '',
        }
    }

    //递归函数生成左侧菜单树
    //这里通过函数的形式，通过递归自身function的方式来生成菜单树的子菜单
    formSubmenusChild(obj){
        let cHtml=<div></div>;
        let childArray=obj.childrens;
        if("undefined"!=typeof(childArray)&&childArray.length>0) {
            cHtml = childArray.map((item, i) => {
                console.log(item);
                return this.formSubmenusChild(item);
            });
            return <SubMenu key={obj.id} title={<span><Icon type="home" />{obj.name}</span>}>
                {cHtml}
            </SubMenu>
        }else{
            console.log(obj.name);
            if (obj.url === "/app/account") {
                var iconType = "contacts";
            } else if (obj.url === "/app/department") {
                var iconType = "bank";
            } else if (obj.url === "/app/employee") {
                var iconType = "team";
            } else if (obj.url === "/app/position") {
                var iconType = "pushpin";
            } else if (obj.url === "/app/role") {
                var iconType = "profile";
            }
            return(
                <Menu.Item key={obj.id}>
                    <Link to={obj.url}><Icon type={iconType} /><span>{obj.name}</span></Link>
                </Menu.Item>
            )
        }
    }



    //装载完成后
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render(){
        const { collapsed, firstHide, openKey, selectedKey } = this.state;
        var data = JSON.parse(localStorage.getItem("employee"));
        let responsecolumn = JSON.stringify(data.menuTree);
        let columnMenus = JSON.parse(responsecolumn);
        let html=columnMenus.map((obj,i)=> {
            return this.formSubmenusChild(obj);
        });


        return(
            <Sider
                trigger={null}
                collapsed={collapsed}
            >
                <div className="logo" style={collapsed?{backgroundSize:'70%'}:{backgroundSize:'30%'}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    // defaultOpenKeys={['sub1','sub2','sub3']}
                    defaultOpenKeys= {['40000000000000000000000000000001']}
                    defaultSelectedKeys={['/app']}
                    selectedKeys={[selectedKey]}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    // openKeys={firstHide ? null : [openKey]}
                >

                    {/*{html}*/}

                     <Menu.Item key={"/app"}>
                        <Link to={"/app"}><Icon type="home" /><span>INDEX</span></Link>
                    </Menu.Item>
                    {html}

                    {/*<SubMenu key="sub1" title={<span><Icon type="edit" /><span>系统管理</span></span>}>*/}
                        {/*<Menu.Item key={"/app/account"}>*/}
                            {/*<Link to={"/app/account"}><Icon type="contacts" /><span>帐户管理</span></Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key={"/app/department"}>*/}
                            {/*<Link to={"/app/department"}><Icon type="bank" /><span>部门管理</span></Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key={"/app/employee"}>*/}
                            {/*<Link to={"/app/employee"}><Icon type="team" /><span>职员管理</span></Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key={"/app/position"}>*/}
                            {/*<Link to={"/app/position"}><Icon type="pushpin" /><span>职位管理</span></Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key={"/app/role"}>*/}
                            {/*<Link to={"/app/role"}><Icon type="profile" /><span>角色管理</span></Link>*/}
                        {/*</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub2" title={<span><Icon type="calendar" /><span>会议室管理</span></span>}>*/}
                        {/*<Menu.Item key={"/app/meeting"}>*/}
                            {/*<Link to={"/app/meeting"}><Icon type="project" /><span>会议管理</span></Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key={"/app/calendar"}>*/}
                            {/*<Link to={"/app/calendar"}><Icon type="calendar" /><span>会议室设施管理</span></Link>*/}
                        {/*</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub3" title={<span><Icon type="user" /><span>个人管理</span></span>}>*/}
                        {/*<Menu.Item key={"/app/personalInformation"}>*/}
                            {/*<Link to={"/app/personalInformation"}><Icon type="user" /><span>个人信息</span></Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key={"/app/meetingSchedule"}>*/}
                            {/*<Link to={"/app/meetingSchedule"}><Icon type="user" /><span>个人会议查看</span></Link>*/}
                        {/*</Menu.Item>*/}
                    {/*</SubMenu>*/}

                </Menu>
            </Sider>
        )
    }
}