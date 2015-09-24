/** @jsx React.DOM */

define([
  'react',
  './constants',
  './actions/ModerationActions',
  'i18n!moderated_grading'
], function (React, Constants, ModerationActions, I18n) {
  var ModeratedColumnHeader = React.createClass({
    displayName: 'ModeratedColumnHeader',
    propTypes:{
      markColumn: React.PropTypes.number,
      sortDirection: React.PropTypes.string,
      includeModerationSetHeaders: React.PropTypes.bool,
      handleSortMark1: React.PropTypes.func.isRequired,
      handleSortMark2: React.PropTypes.func.isRequired,
      handleSortMark3: React.PropTypes.func.isRequired
    },

    handleSelectAll (event) {
      if (event.target.checked) {
        var allStudents = this.props.store.getState().students;
        this.props.store.dispatch(ModerationActions.selectAllStudents(allStudents));
      } else {
        this.props.store.dispatch(ModerationActions.unselectAllStudents());
      }
    },

    renderLinkArrow (mark) {
      if (mark === this.props.markColumn){
        if (this.props.sortDirection === Constants.sortDirections.DESCENDING){
          return(<i className='icon-mini-arrow-down'></i>);
        }else{
          return(<i className='icon-mini-arrow-up'></i>);
        }
      }
    },
    render () {
      if(this.props.includeModerationSetHeaders){
        return(
          <div className='ModeratedColumnHeader'>
            <div className='ModeratedColumnHeader__StudentName ColumnHeader__Item'>
              <input type='checkbox' onChange={this.handleSelectAll} />
              <span>{I18n.t('Student')}</span>
            </div>

            <div className='ModeratedColumnHeader__Mark ColumnHeader__Item'>
              <a href='#' onClick={this.props.handleSortMark1}>{I18n.t('1st Mark')} {this.renderLinkArrow(Constants.markColumnNames.MARK_ONE)}</a>
            </div>

            <div className='ColumnHeader__Mark ColumnHeader__Item'>
              <a href='#' onClick={this.props.handleSortMark2}>{I18n.t('2nd Mark')} {this.renderLinkArrow(Constants.markColumnNames.MARK_TWO)}</a>
            </div>

            <div className='ColumnHeader__Mark ColumnHeader__Item'>
              <a href='#' onClick={this.props.handleSortMark3}>{I18n.t('3rd Mark')} {this.renderLinkArrow(Constants.markColumnNames.MARK_THREE)}</a>
            </div>

            <div className='ColumnHeader__FinalGrade ColumnHeader__Item'>
              <span>{I18n.t('Grade')}</span>
            </div>
          </div>
        );
      }else{
        return(
          <div className='ColumnHeader'>
            <div className='ColumnHeader__StudentName ColumnHeader__Item'>
              <input type='checkbox' onChange={this.handleSelectAll} />
              <span>{I18n.t('Student')}</span>
            </div>

            <div className='ColumnHeader__Mark ColumnHeader__Item'>
              <a href='#' onClick={this.props.handleSortMark1}>{I18n.t('1st Mark')} {this.renderLinkArrow(Constants.markColumnNames.MARK_ONE)}</a>
            </div>
          </div>
        );
      }
    }
  });

  return ModeratedColumnHeader;
});
