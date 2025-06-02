<script lang="ts">


// Required information
// You can get userSig from TencentCloud chat console for Testing TUIKit.
// Deploy production environment please get it from your server.
// View https://cloud.tencent.com/document/product/269/32688


export default {
	onLaunch: function() {
		console.log('App Launch')
		
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
	@import '@/uni_modules/uv-ui-tools/index.scss';
	@import './styles/variables.scss';

	/* common css for page */
	uni-page-body,html,body,page {
		width: 100% !important;
		height: 100% !important;
		overflow: hidden;
	}
</style>
