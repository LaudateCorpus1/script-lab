import { connect } from 'react-redux'

import Editor from '../components/Editor'
import { selectors } from '../reducers'
import { push } from 'connected-react-router'

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  const solutionFileIds = selectors.solutions.get(state, ownProps.params.solutionId).files
  const urlFileId = ownProps.params.fileId
  const activeFileId = solutionFileIds.includes(urlFileId)
    ? urlFileId
    : solutionFileIds[0]

  return {
    files: solutionFileIds.map(fileId => selectors.files.get(state, fileId)),
    activeFile: selectors.files.get(state, activeFileId),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeActiveFile: (fileId: string) =>
    dispatch(push(`/edit/${ownProps.params.solutionId}/${fileId}`)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
