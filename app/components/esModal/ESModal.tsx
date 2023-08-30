import { EuiButton, EuiGlobalToastList, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle } from "@elastic/eui"
import AddElasticServer from "../utils/AddElasticServer"

export const ESModal = (setIsModalVisible, toasts, removeToast, setToasts) => {
    <EuiModal onClose={() => setIsModalVisible(false)} initialFocus="[name=popswitch]" style={{ width: 1200, height: 550 }}>
    <EuiGlobalToastList
      toasts={toasts}
      dismissToast={removeToast}
      toastLifeTimeMs={6000}
    />
    <EuiModalHeader>
      <EuiModalHeaderTitle>No Elasticsearch server connection!</EuiModalHeaderTitle>
    </EuiModalHeader>  
    <EuiModalBody>

      <AddElasticServer 
        setToasts={setToasts} 
      />

    </EuiModalBody>
    <EuiModalFooter>
      <EuiButton type="submit" onClick={() => setIsModalVisible(false)}>
        Exit
      </EuiButton>
    </EuiModalFooter>
    </EuiModal>
}