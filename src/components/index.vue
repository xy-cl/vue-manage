<template>
	<el-row style="height: 100%;">
		<el-col :span="24" class="index_header">
			<nav class="index_nav">
				<div class="index_nav_logo" :class="collapsed?'logo-colladpsed-width':'logo-width'">
					<h1 v-show="!collapsed">LOGO</h1>
					<h4 v-show="collapsed">logo</h4>
				</div>
				<div class="index_nav_slide">
					<i @click="collapse" class="fa fa-align-justify"></i>
				</div>
				<div class="index_nav_info">
					<el-dropdown>
  <span class="el-dropdown-link userinfo-inner">
    {{sysUserName}}<img :src="this.sysUserAvatar" />
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>我的消息</el-dropdown-item>
    <el-dropdown-item>设置</el-dropdown-item>
    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
				</div>
			</nav>
		</el-col>
		<el-col class="main" :span="24">
			<aside ref="msgTop" class="index_aside" :class="collapsed?'menu-collapsed':'menu-expanded'" :style="asideHeight">
				<el-menu v-show="!collapsed" :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
		<template v-for="(item, index) in items">
			<el-submenu :index="index+''" v-if="!item.leaf">
				<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
				<el-menu-item :index="child.path" v-for="child in item.children">
					{{child.name}}
				</el-menu-item>
			</el-submenu>
			<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
				<i :class="item.iconCls"></i>
				{{item.children[0].name}}
			</el-menu-item>
		</template>
	</el-menu>
	<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in items" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="main_content">
				<div class="conent_top">
					<el-breadcrumb separator="/" class="breadcrumb-inner">
						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
							{{ item.name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>

			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				clientHeight: '',
				asideHeight: {
//					height: `${document.documentElement.clientHeight}px`
				},

				items: [
					{
						path: '/',
						name: '',
						iconCls: 'el-icon-message',
						leaf: true,
						children: [
							{path: '/main', name: '主页'}
						]
					},{
						path: '/',
						name: '导航二',
						iconCls: 'el-icon-message',
						children: [
							{path: '/ahtml', name: 'ahtml'},
							{path: '/bhtml', name: 'bhtml'}
						]
					},{
						path: '/',
						name: '导航三',
						iconCls: 'el-icon-message',
						children: [
							{path: '/chtml', name: 'chtml'},
							{path: '/dhtml', name: 'dhtml'}
						]
					}
				],
				collapsed: false
			}
		},
		methods: {
			collapse: function() {
				this.collapsed =! this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			logout: function() {
				var _this = this;
				this.$confirm('确认退出吗？', '提示', {

				}).then(() => {
					_this.$router.push('/login');
				}).catch(() => {

				})
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if(user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avater || '';
			}
			console.log(this.$route.params);
		}
	}
</script>

<style>
	*{margin: 0;padding: 0;}
	html, body{width: 100%;height: 100%;overflow: hidden;}
	.main{
		position: absolute;
		top: 60px;
		bottom: 0;
		/*overflow: hidden;*/
		display: flex;
	}
	.index_header{
		height: 60px;
	}
	.index_nav{
		height: 100%;
		background: #167fbf;
	}
	.index_nav_logo{
		text-align: center;
		line-height: 60px;
		border-right: 1px solid #fff;
		float: left;
		position: relative;
	}
	.logo-colladpsed-width{
		width: 60px;
	}
	.logo-width{
		width: 240px;
	}
	.index_nav_slide{
		width: auto;
		height: auto;
		float: left;
		padding: 19px;
		color: #fff;
	}
	.index_nav_slide i{
		cursor: pointer;
	}
	.index_nav_info{
		width: auto;
		height: 100%;
		float: right;
	}

	.userinfo-inner{
		cursor: pointer;
		color: #fff;
		line-height: 60px;
	}
	.userinfo-inner img{
		width: 40px;
		height: 40px;
		border-radius: 20px;
		float: right;
		margin: 10px;
	}

	.index_aside{
		flex:  0 0 240px;
		width: 240px;
		/*height: auto;*/
		background: #eef1f6;
		/*float: left;*/

	}
	.main_content{
		border: 1px solid red;
		flex: 1;
		background: #fff;
		padding: 10px;
	}
	.menu-collapsed{
		flex: 0 0 60px;
		width: 60px;
	}
	.menu-expanded{
		flex:0 0 240px;
		width: 240px;
	}
	.item{
		position: relative;
	}
	.submenu{
		position:absolute;
		top:0px;
		left:60px;
		z-index:99999;
		height:auto;
		display:none;
	}
	.conent_top{
		width: 100%;
		height: 40px;
		padding: 5px;
	}
</style>